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
    const existingFollow = await this.followCollection().findOne({ followingId, followerId });
    console.log(existingFollow, "<<<< existingFollow");
    if (existingFollow) {
      throw new Error("You are already followed this user");
    }
    return existingFollow;
  }

  static async deleteFollow(followingId, followerId) {
    const result = await this.followCollection().deleteOne({ followingId, followerId });
    return result 
  }
}

module.exports = Follow;