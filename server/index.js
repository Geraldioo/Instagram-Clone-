if (process.env.NODE_ENV !== "production") {
  require('dotenv').config()
}
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { resolversUser, typeDefsUser } = require("./schemas/users");
const { resolversPost, typeDefsPost } = require("./schemas/posts");
const { resolversFollow, typeDefsFollow } = require("./schemas/follow");
const { verifyToken } = require("./helpers/jwt");

const port = process.env.PORT || 4000

const server = new ApolloServer({
  typeDefs: [typeDefsUser, typeDefsPost, typeDefsFollow],
  resolvers: [resolversUser, resolversPost, resolversFollow],
  introspection: true,
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: port },
    context: ({ req, res }) => {
      return {
        auth: () => {
          const auth = req.headers.authorization;
          if (!auth) throw new Error("Invalid Token");

          const [type, token] = auth.split(" ")
          if (!token) throw new Error("Invalid Token");
          if (type !== "Bearer") throw new Error("Invalid Token");

          const decoded = verifyToken(token);
          if(!decoded) throw new Error("Invalid Token");
          
          return decoded;
        },
      };
    },
  });
  console.log(`🚀 Server ready at ${url}`);
})();
