const { GraphQLError } = require("graphql");
const Post = require("../models/Posts");

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
  }
  
  type Mutation {
    addPost(content: String!, tags: [String], imgUrl: String, authorId: ID!): Post
    commentPost(_id: ID!, content: String!): Post
    likePost(_id: ID!): Post
  }
`;

const resolversPost = {
  Query: {
    posts: async (_, __, { auth }) => {
      auth();
      try {
        const posts = await Post.findAll();
        return posts;
        a;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    addPost: async (_, { content, tags, imgUrl, authorId }, { auth }) => {
      auth();
      try {
        if (!content) throw new Error("Content is required");
        if (!imgUrl) throw new Error("Image Url is required");
        if (!authorId) throw new Error("Author Id is required");
        const newPost = {
          content,
          tags,
          imgUrl,
          authorId,
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

        const result = await Post.updateOne(_id, { comments: newComment });

        return result;
      } catch (error) {
        throw error;
      }
    },
    likePost: async (_, { _id }, { auth }) => {
      try {
        auth()
        const currentLike = auth();
        console.log(currentLike);
        if (!_id) throw new Error("Id not found");
        if (!currentLike.username) throw new Error("Username is required");

        const newLike = {
          username: currentLike.username,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        const result = await Post.updateOne(_id, { likes: newLike });
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
