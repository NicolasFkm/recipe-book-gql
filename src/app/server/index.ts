import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import ws from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { execute, subscribe } from 'graphql';
import cors from 'cors';
import typeDefs from '@app/graphql/typedefs';
import resolvers from '@app/graphql/resolvers';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { pubSub } from '@infra/pubsub';

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
    context: {
      pubSub: pubSub,
    },
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
      context: {
        pubSub: pubSub,
      },
    },
    wsServer
  );
});
