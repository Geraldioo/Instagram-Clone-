const { ApolloServer } = require ("@apollo/server");
const { startStandaloneServer } = require ("@apollo/server/standalone");
const  {resolversBook, typeDefsBook } = require ("./schemas/book")

const server = new ApolloServer({
  typeDefs: typeDefsBook,
  resolvers: resolversBook,
  introspection: true
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: () => {
      return {
        id: "123",
      };
    },
  });
  console.log(`🚀 Server ready at ${url}`);
}) ();

