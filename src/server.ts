import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import Express from "express";
import { buildSchema } from "type-graphql";
import { connect } from "mongoose";

import { ProductResolver } from "@resolvers/products";
import { CategoriesResolver } from "@resolvers/categories";

const main = async () => {
  const schema = await buildSchema({
    resolvers: [CategoriesResolver, ProductResolver],
    emitSchemaFile: true,
    validate: false,
  });

  // create mongoose connection
  const mongoose = await connect("mongodb://localhost:27017/test");
  await mongoose.connection;

  const app = Express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  server.applyMiddleware({ app, cors: false });

  app.listen({ port: 3333 }, () =>
    console.log(
      `🚀 Server ready and listening at ==> http://localhost:3333${server.graphqlPath}`
    )
  );
};

main().catch((error) => {
  console.log(error, "error");
});
