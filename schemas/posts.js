const { GraphQLError } = require("graphql");
const Post = require("../models/Post");

const typeDefsPost = `#graphql
  scalar Date

  type Post {
    _id: ID
    content: String!
    tags: [String]
    imgUrl: String
    authodId: ID! 
    comments: [Comments]
    likes: [Likes]
    createdAt: Date
    updatedAt: Date
  }
  type Comments {
    content: String!
    username: String!
    createdAt: Date
    updatedAt: Date
  }
  type Likes {
    username: String!
    createdAt: Date
    updatedAt: Date
  }
  type Query {
    posts: [Post]
  }
  type Mutation {
    createPost(content: String!, tags: [String], imgUrl: String, authodId: ID!): Post
    commentPost(_id: ID!, content: String!): Post
    likePost(_id: ID!): Post
  }
`;

const resolversPost = {
  Query: {
    posts: async () => {
      try {
        const posts = await Post.findAll();
        return posts;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createPost: async (_, { content, tags, imgUrl, authodId }) => {
      try {
        const newPost = {
          content,
          tags,
          imgUrl,
          authodId,
        };
        const result = await Post.createOne(newPost);
        newPost._id = result.insertedId;

        return newPost;
      } catch (error) {
        throw error;
      }
    },
    commentPost: async (_, args) => {
      try {
        if (!args._id) {
          throw new GraphQLError("Not Found", {
            extensions: {
              code: "NOT_FOUND",
            },
          });
        }
        const newComment = {
          content: args.content,
          username,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const post = await Post.findById(args._id);
        const result = post.comments.push(newComment);

        return result;
      } catch (error) {
        throw error;
      }
    },
    likePost: async (_, args) => {
      try {
        if (!args._id) {
          throw new GraphQLError("Not Found", {
            extensions: {
              code: "NOT_FOUND",
            },
          });
        }
        const newLike = {
          username,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const post = await Post.findById(args._id);
        const result = post.likes.push(newLike);

        return result;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = {
  typeDefsPost,
  resolversPost
};