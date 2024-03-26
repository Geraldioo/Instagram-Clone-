const { GraphQLError } = require("graphql");
const Follow = require("../models/Follow");

const typeDefs = `#graphql
  scalar Date

  type Follow {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: Date
    updatedAt: Date
  }
  type Mutation {
    followUser(_id: ID!): Follow
  }
`;

const resolvers = {
  Mutation: {
    followUser: async (_, args) => {
      try {
        const newFollow = {
          followingId: args._id,
          followerId: username,
        };
        const result = await Follow.createOne(newFollow);

        return result;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers
};