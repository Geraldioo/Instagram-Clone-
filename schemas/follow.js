const { GraphQLError } = require("graphql");
const Follow = require("../models/Follow");

const typeDefsFollow = `#graphql
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

const resolversFollow = {
  Mutation: {
    followUser: async (_, args, { userId, auth }) => {
      auth();
      try {
        console.log(args, "<<< ARGS");
        const newFollow = {
          followingId: args._id,
          followerId: userId,
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
  typeDefsFollow,
  resolversFollow,
};
