const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const User = require("../models/Users");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

const typeDefsUser = `#graphql
  type User {
    _id: ID
    name: String!
    username: String!
    email: String!
    password: String
    followerDetail: [UserDetail]
    followingDetail: [UserDetail]
    userPost: [UserPost]
  }

  type UserPost {
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
    username: String
    createdAt: Date!
    updatedAt: Date!
  }

  type UserDetail {
    _id: ID
    name: String!
    username: String!
    email: String!
  }

  type Query {
    userById(_id: ID): User
    searchUser(username: String!): [User],
    myProfile: User
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
    userById: async (_, { _id }, { auth }) => {
      auth();
      if (!_id) throw new Error("User not found");
      const users = await User.getDetail(_id);
      return users;
    },
    searchUser: async (_, { username }, { auth }) => {
      auth();
      if (!username) throw new Error("Username required");

      const user = await User.getByUsername(username);

      if (!user) throw new Error("User not found");

      return user;
    },
    myProfile: async (_, __, { auth }) => {
      const data = auth();
      const myProfile = await User.myProfile(data.id);
      return myProfile;
    },
  },
  Mutation: {
    register: async (_, { name, username, email, password }) => {
      if (!username) throw new Error("Username required");
      if (!name) throw new Error("Name required");
      if (!email) throw new Error("Email required");
      if (!password) throw new Error("Password required");

      if (password.length < 5)
        throw new Error("Password must be at least 5 characters long");

      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!email.match(validRegex))
        throw new Error("Email must be formated (example@mail.com)");

      const findEmail = await User.findByEmail(email);
      if (findEmail) throw new Error("Email already exists");

      const findByUsername = await User.findByUsername(username);
      if (findByUsername) throw new Error("Username already exists");

      const newUser = {
        name,
        username,
        email,
        password: hashPassword(password),
      };
      const result = await User.createOne(newUser);

      newUser._id = result.insertedId;

      return newUser;
    },

    login: async (_, { username, password }) => {
      if (!username) throw new Error("Username required");
      if (!password) throw new Error("Password required");

      const user = await User.findByUsername(username);

      if (!user) throw new Error("Username / Password Invalid");

      const validPassword = comparePassword(password, user.password);

      if (!validPassword) throw new Error("Username / Password Invalid");

      const token = {
        accessToken: signToken({ id: user._id, username: user.username }),
      };

      return token;
    },
  },
};

module.exports = { resolversUser, typeDefsUser };
