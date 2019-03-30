const { ApolloServer } = require("apollo-server-express")
const typeDefs = require("../schema")
const resolvers = require("../resolver")
const express = require("express")
const { createServer } = require("http")

const server = new ApolloServer({
    introspection: true,
    typeDefs,
    resolvers,
    tracing: true,
    cacheControl: true,
    engine: false,
})

const app = express()

server.applyMiddleware({ app })

//app.use(express.static(_dirname + "/public"))

const httpServer = createServer(app)
server.applyMiddleware({
    app
  });
  server.installSubscriptionHandlers(httpServer);
  httpServer.listen(
    {
      port: 6003
    },
    () =>
      console.log(
        `GraphQL Server running @ http://localhost:6003${server.graphqlPath}`
      )
  );
  
