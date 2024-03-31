const { objectId } = require("mongodb");
const { database } = require("../config/mongo");

class Follow {
  static followCollection() {
    return database.collection("follows");
  }

  static async createFollow(payload) {
    const newFollow = await this.followCollection().insertOne(payload);
    return newFollow;
  }

  static async findAll() {
    const agg = [
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "followerId",
          foreignField: "_id",
          as: "followerUser",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "followingId",
          foreignField: "_id",
          as: "followingUser",
        },
      },
    ];
    const cursor = await this.followCollection().aggregate(agg);
    const result = await cursor.toArray();
    return result;
  }

  static async deleteFollow(followingId, followerId) {
    const result = await this.followCollection().deleteOne({
      followingId,
      followerId,
    });
    return result;
  }
}

module.exports = Follow;
