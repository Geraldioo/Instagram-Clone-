const { objectId } = require("mongodb");
const { database } = require("../config/mongo");

class Post {
  static postCollection() {
    return database.collection("posts");
  }

  static async findAll() {
    const posts = await this.postCollection().find().toArray();
    return posts;
  }

  static async findById(id) {
    const post = await this.postCollection().findOne({
      _id: new objectId(String(id))
    });
    return post
  }

  static async createOne(payload) {
    const newPost = await this.postCollection().insertOne(payload);
    return newPost;
  }
}

module.exports = Post;