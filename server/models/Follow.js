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

  static async findFollowers(followingId, followerId) {
    const existingFollow = await Follow.findOne({ followingId, followerId });
    console.log(existingFollow, "<<<< existingFollow");
    if (existingFollow) {
      throw new Error("You are already following this user");
    }
    return existingFollow;
  }

  static async deleteFollow(followingId, followerId) {
    const result = await Follow.deleteOne({ followingId, followerId });
    return result 
  }
}

module.exports = Follow;