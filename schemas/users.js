const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const User = require("../models/Users");

const typeDefsUser = `#graphql
  type User {
    _id: ID
    name: String
    username: String
    email: String
    password: String
  }

  type Query {
    userById(_id: ID): User
    users: [User],
  }

  type Mutation {
    addUser(name: String, username: String, email: String, password: String): User
  }

`;

const resolversUser = {
  Query: {
    users: async () => {
      const users = await User.findAll()
      return users
    }
  },
  Mutation: {
    addUser: async (_, { name, username, email, password }) => {
      const newUser = {
        name,
        username,
        email,
        password
      }
      const result = await User.createOne(newUser)

      newUser._id = result.insertedId

      return newUser
    }
  }
};

module.exports = { resolversUser, typeDefsUser };
