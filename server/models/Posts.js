const { ObjectId } = require("mongodb");
const { database } = require("../config/mongo");
const redis = require("../config/redis");

class Post {
  static postCollection() {
    return database.collection("posts");
  }

  static async findAll() {
    const redisPosts = await redis.get("posts");
    if (redisPosts) {
      return JSON.parse(redisPosts);
    } else {
      const agg = [
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "authorId",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $unwind: {
            path: "$author",
            preserveNullAndEmptyArrays: true,
          },
        },
      ];
      const cursor = this.postCollection().aggregate(agg);
      const result = await cursor.toArray();
      await redis.set("posts", JSON.stringify(result));
      return result;
    }
  }

  static async findById(id) {
    const agg = [
      {
        $match: {
          _id: new ObjectId(String(id)),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: {
          path: "$author",
          preserveNullAndEmptyArrays: true,
        },
      },
    ];
    const cursor = this.postCollection().aggregate(agg);
    const result = await cursor.toArray();

    return result;
  }

  static async createOne(payload) {
    const newPost = await this.postCollection().insertOne(payload);
    await redis.del("posts");
    return newPost;
  }

  static async updateOne(id, update, username) {
    if (update.likes) {
      const agg = [
        {
          $match: {
            _id: new ObjectId(String(id)),
          },
        },
      ];
      const cursor = this.postCollection().aggregate(agg);
      const result = await cursor.toArray();
      result[0].likes.forEach((item) => {
        if (item.username === username) throw new Error("Already liked");
      });
    }

    const post = await this.postCollection().updateOne(
      { _id: new ObjectId(String(id)) },
      { $push: update }
    );

    if (!post) throw new Error("Post not found");

    const agg = [
      {
        $match: {
          _id: new ObjectId(String(id)),
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "authorId",
          foreignField: "_id",
          as: "author",
        },
      },
    ];
    const cursor = this.postCollection().aggregate(agg);
    const result = await cursor.toArray();
    await redis.del("posts");
    return result[0];
  }

  static async unlikePost(id, username) {
    const post = await this.postCollection().findOne({
      _id: new ObjectId(String(id)),
    });
    if (!post) {
      throw new Error("Postingan Not Found");
    }

    const result = await this.postCollection().updateOne(
      { _id: new ObjectId(String(id)) },
      { $pull: { likes: { username } } }
    );

    if (result.modifiedCount === 0) {
      throw new Error("Post not found");
    }

    const updatedPost = await this.postCollection().findOne({
      _id: new ObjectId(String(id)),
    });
    await redis.del("posts");
    return updatedPost;
  }
}

module.exports = Post;
