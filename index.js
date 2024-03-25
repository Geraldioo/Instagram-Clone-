const { ApolloServer } = require ("@apollo/server");
const { startStandaloneServer } = require ("@apollo/server/standalone");
const  {resolversUser, typeDefsUser } = require ("./schemas/users")

const server = new ApolloServer({
  typeDefs: typeDefsUser,
  resolvers: resolversUser,
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

