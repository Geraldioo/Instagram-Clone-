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
      ];
      const cursor = this.postCollection().aggregate(agg);
      const result = await cursor.toArray();
      await redis.set("posts", JSON.stringify(result));
      console.log(result);
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
          from: "Users",
          localField: "authorId",
          foreignField: "_id",
          as: "author",
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

  static async updateOne(id, update) {
    const post = await this.postCollection().updateOne(
      { _id: new ObjectId(String(id)) },
      { $push: update }
    );
    return post;
  }
}

module.exports = Post;
