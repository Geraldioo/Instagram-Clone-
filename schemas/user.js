const { ApolloServer } = require ('@apollo/server');
const { startStandaloneServer } = require ('@apollo/server/standalone');
const { GraphQLError } = require('graphql');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const books = [
    {
      id: 1,
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      id: 2,
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];


  const typeDefsUser = `#graphql
  type User {
    id: Int
    title: String
    author: String
  }

  type Query {
    userById(id: Int): User
    users: [User],
  }

  type Mutation {
    addUser(title: String, author: String): User
  }

`;

const resolversUser = {
    Query: {
      users: (_, contextValue) => {
        console.log(contextValue, "<<< context value");
        return users
      },
      // bookById: (_, args) => {
      //   if (!args.id){
      //     throw new GraphQLError("Not Found", {
      //       extensions: {
      //         code: "NOT_FOUND",
      //         // http: {
      //         //   status: 404
      //         // }
      //       }
      //     })
      //   }
      //   const user  = user.find((el) => {
      //     return el.id == args.id
      //   })
      // }
    },
    // Mutation: {
    //   addBook: (_, { title, author }) => {
    //     const newBook = {
    //       id: books.length + 1,
    //       title,
    //       author
    //     }
    //     books.push(newBook)

    //     return newBook
    //   }
    // }
  };

module.exports = { resolversUser , typeDefsUser}