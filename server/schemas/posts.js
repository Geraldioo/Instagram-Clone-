const { GraphQLError } = require("graphql");
const Post = require("../models/Posts");
const { ObjectId } = require("mongodb");

const typeDefsPost = `#graphql
  scalar Date

  type Post {
    _id: ID
    content: String!
    tags: [String]
    imgUrl: String!
    authorId: ID!
    comments: [Comment]
    likes: [Like]
    createdAt: Date!
    updatedAt: Date!
    author: Author
  }
  type Author {
    _id: ID
    name: String
    username: String
    email: String
  }
  type Comment {
    content: String!
    username: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type Like {
    username: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type Query {
    posts: [Post]
    post(_id: ID): Post
  }
  
  type Mutation {
    addPost(content: String!, tags: [String], imgUrl: String): Post
    commentPost(_id: ID!, content: String!): Comment
    likePost(_id: ID!): Like
    unlikePost(_id: ID!): Like
  }
`;

const resolversPost = {
  Query: {
    posts: async (_, __, { auth }) => {
      auth();
      try {
        const posts = await Post.findAll();
        return posts;
      } catch (error) {
        throw error;
      }
    },
    post: async (_, args, { auth }) => {
      try {
        auth();
        if (!args._id) throw new Error("Id is required");

        const post = await Post.findById(args._id);

        return post[0];
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    addPost: async (_, { content, tags, imgUrl }, { auth }) => {
      auth();
      const currentUser = auth();
      try {
        if (!content) throw new Error("Content is required");
        if (!imgUrl) throw new Error("Image Url is required");
        if (!currentUser.id) throw new Error("Author Id is required");
        const newPost = {
          content,
          tags,
          imgUrl,
          authorId: new ObjectId(String(currentUser.id)),
          comments: [],
          likes: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        const result = await Post.createOne(newPost);
        newPost._id = result.insertedId;

        return newPost;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    commentPost: async (_, { content, _id }, { auth }) => {
      try {
        auth();
        const currentUser = auth();
        if (!content) throw new Error("Content is required");
        if (!_id) throw new Error("Id not found");
        const newComment = {
          content,
          username: currentUser.username,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        const result = await Post.updateOne(
          _id,
          { comments: newComment },
          currentUser.username
        );
        return newComment;
      } catch (error) {
        throw error;
      }
    },
    likePost: async (_, { _id }, { auth }) => {
      try {
        auth();
        const currentUser = auth();
        if (!_id) throw new Error("Id not found");
        if (!currentUser.username) throw new Error("Username is required");

        const newLike = {
          username: currentUser.username,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        const result = await Post.updateOne(
          _id,
          { likes: newLike },
          currentUser.username
        );
        return newLike;
      } catch (error) {
        throw error;
      }
    },
    unlikePost: async (_, { _id }, { auth }) => {
      try {
        auth();
        const currentUser = auth();
        if (!_id) throw new Error("Id not found");
        if (!currentUser.username) throw new Error("Username is required");

        const result = await Post.unlikePost(_id, currentUser.username);
        return result;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = {
  typeDefsPost,
  resolversPost,
};
