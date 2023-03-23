import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { GraphQLSchema } from 'graphql';
import ws from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { execute, subscribe } from 'graphql';
import categoriesMutation from '../graphql/resolvers/categories/mutations';
import recipeQueries from '../graphql/resolvers/recipes/queries';
import categoriesSubscriptions from '../graphql/resolvers/categories/subscriptions';
import cors from 'cors';
import categoryQueries from '../graphql/resolvers/categories/queries';

const schema: GraphQLSchema = loadSchemaSync(
  path.resolve(__dirname, '../graphql/**/*.schema.graphql'),
  { loaders: [new GraphQLFileLoader()] }
);

const rootValue = {
  // ...recipeQueries,
  ...categoryQueries,
  ...categoriesMutation,
  ...categoriesSubscriptions,
};

const app = express();
app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);

const server = app.listen(5000, () => {
  console.log('GraphQL server with Express running on localhost:5000/graphql');
  const wsServer = new ws.Server({
    server,
    path: '/subscriptions',
  });
  useServer(
    {
      schema,
      subscribe,
      execute,
      onConnect: (_) => {
        console.log('Connect');
      },
      onSubscribe: (_, __) => {
        console.log('Subscribe');
      },
      onNext: (_, __, ___, ____) => {
        console.debug('Next');
      },
      onError: (_, __, ___) => {
        console.error('Error', __, ___);
      },
      onComplete: (_, __) => {
        console.log('Complete');
      },
    },
    wsServer
  );
});
