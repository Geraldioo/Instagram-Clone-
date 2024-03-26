const { ObjectId } = require("mongodb");
const { database } = require("../config/mongo");

class User {
  static userCollection() {
    return database.collection("users");
  }

  static async findAll() {
    const users = await this.userCollection().find().toArray();
    return users;
  }

  static async findByUsername(username) {
    const findUser = await this.userCollection().findOne({
      username: username,
    });
    return findUser;
  }
  static async findByEmail(email) {
    const findUser = await this.userCollection().findOne({
      email: email,
    });
    return findUser;
  }

    static async findById(id) {
      const user = await this.userCollection().findOne({
        _id: new ObjectId(String(id)),
      });
      return user;
    }

  static async createOne(payload) {
    const newUser = await this.userCollection().insertOne(payload);
    return newUser;
  }

  static async getDetail(id) {
    const agg = [
      {
        $match: {
          _id: new objectId(String(id)),
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followingId",
          as: "followers",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "followers.followerId",
          foreignField: "_id",
          as: "followerDetail",
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followerId",
          as: "followings",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "followings.followingId",
          foreignField: "_id",
          as: "followingDetail",
        },
      },
      {
        $project: {
          password: 0,
          "followingDetail.password": 0,
          "followerDetail.password": 0,
        },
      },
    ];

    const cursor = this.collection().aggregate(agg);
    const result = await cursor.toArray();
    return result[0];
  }
}

module.exports = User;
