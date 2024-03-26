const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const User = require("../models/Users");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

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

  type Token {
    accessToken: String
  }

  type Mutation {
    register(name: String!, username: String!, email: String!, password: String!): User
    login(username: String!, password: String!): Token
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
    register: async (_, { name, username, email, password }) => {
      if(!email || !password) throw new Error("Email / password required");
      if(!name || !username) throw new Error("Name / username required");
      const newUser = {
        name,
        username,
        email,
        password: hashPassword(password)
      }
      const result = await User.createOne(newUser)

      newUser._id = result.insertedId

      return newUser
    },

    login: async (_, { username, password }) => {
      if(!username) throw new Error("Username required");
      if(!password) throw new Error("Password required");

      const user = await User.findByUsername(username)

      if(!user) throw new Error("Username / Password Invalid");

      const validPassword = comparePassword(password, user.password);

      if(!validPassword) throw new Error("Username / Password Invalid")

      const token = {
        accessToken: signToken({ id: user._id, username: user.username })
      }

      return token
    }
  }
};

module.exports = { resolversUser, typeDefsUser };