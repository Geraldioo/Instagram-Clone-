const { GraphQLError } = require("graphql");
const Follow = require("../models/Follow");
const { ObjectId } = require("mongodb");

const typeDefsFollow = `#graphql
  scalar Date

  type Follow {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: Date
    updatedAt: Date
    followerUser: [follower]
    followingUser: [following]
  }
  type follower {
    _id: ID,
    name: String,
    username: String,
    email: String
  }
  type following {
    _id: ID,
    name: String,
    username: String,
    email: String
  }
  type Query {
    follows: [Follow]
  }
  type Mutation {
    followUser(_id: ID!): Follow
    unfollowUser(_id: ID!): Follow
  }
`;

const resolversFollow = {
  Query: {
    follows: async () => {
      const follows = await Follow.findAll();
      return follows;
    },
  },
  Mutation: {
    followUser: async (_, { _id }, { auth }) => {
      auth();
      const currentUser = auth();

      const followerId = new ObjectId(String(currentUser.id));
      const followingId = new ObjectId(String(_id));

      const newFollow = {
        followingId,
        followerId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const result = await Follow.createFollow(newFollow);
      newFollow._id = result.insertedId;
      return newFollow;
    },

    unfollowUser: async (_, { _id }, { auth }) => {
      try {
        auth();
        const currentUser = auth();

        const followerId = new ObjectId(String(currentUser.id));
        const followingId = new ObjectId(String(_id));

        const deleteResult = await Follow.deleteFollow(followingId, followerId);

        return deleteResult;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = {
  typeDefsFollow,
  resolversFollow,
};
