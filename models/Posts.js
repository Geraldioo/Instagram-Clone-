const { ObjectId } = require("mongodb");
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
      _id: new ObjectId(String(id))
    });
    return post
  }

  static async createOne(payload) {
    const newPost = await this.postCollection().insertOne(payload);
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