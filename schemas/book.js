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


  const typeDefsBook = `#graphql
  type Book {
    id: Int
    title: String
    author: String
  }

  type Query {
    books: [Book],
    bookById(id: Int): Book
  }

  type Mutation {
    addBook(title: String, author: String): Book
  }

`;

const resolversBook = {
    Query: {
      books: (_, __, contextValue) => {
        console.log(contextValue, "<<< context value");
        return books
      },
      bookById: (_, args) => {
        if (!args.id){
          throw new GraphQLError("Not Found", {
            extensions: {
              code: "NOT_FOUND",
              // http: {
              //   status: 404
              // }
            }
          })
        }
        const book  = book.find((el) => {
          return el.id == args.id
        })
      }
    },
    Mutation: {
      addBook: (_, { title, author }) => {
        const newBook = {
          id: books.length + 1,
          title,
          author
        }
        books.push(newBook)

        return newBook
      }
    }
  };

module.exports = { resolversBook , typeDefsBook}