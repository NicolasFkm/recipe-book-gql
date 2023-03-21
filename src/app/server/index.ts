import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { GraphQLSchema } from 'graphql';
import recipeQueries from '../graphql/resolvers/recipes/queries';

// GraphQL Query Root Schema
// const QueryRoot = new GraphQLObjectType({
//     name: 'Query',
//     fields: () => ({
//         hello: {
//             type: GraphQLString,
//             resolve: () => "Hello world!"
//         },
//         recipe: {
//             type: GraphQLString,
//             resolve: () => "Hello world!"
//         }
//     })
// })

const schema: GraphQLSchema = loadSchemaSync(
  path.resolve(__dirname, '../graphql/**/*.schema.graphql'),
  { loaders: [new GraphQLFileLoader()] }
);

const rootValue = {
  ...recipeQueries,
};

const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);

app.listen(5000, () => {
  console.log('GraphQL server with Express running on localhost:5000/graphql');
});
