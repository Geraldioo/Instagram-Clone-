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
}

module.exports = Follow;