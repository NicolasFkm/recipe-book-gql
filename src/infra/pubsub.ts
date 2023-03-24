import { PubSub } from 'graphql-subscriptions';
// import { TypedPubSub } from 'typed-graphql-subscriptions';

export type PubSubChannels = {};

const pubsub = new PubSub();
export const pubSub = pubsub;
