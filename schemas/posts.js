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
        return posts;a
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    addPost: async (_, { content, tags, imgUrl, authorId }, { auth }) => {
      auth();
      try {
        console.log(authorId, "<<<");
        if (!content) throw new Error("Content is required");
        if (!imgUrl) throw new Error("Image Url is required");
        if (!authorId) throw new Error("Author Id is required");
        const newPost = {
          content,
          tags,
          imgUrl,
          authorId,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const result = await Post.createOne(newPost);
        newPost._id = result.insertedId;

        return newPost;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    commentPost: async (_, args) => {
      try {
        if (!args._id) {
          throw new Error("Not Found", {
            extensions: {
              code: "NOT_FOUND",
            },
          });
        }
        const newComment = {
          content: args.content,
          username: args.username,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
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
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
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
  resolversPost,
};
