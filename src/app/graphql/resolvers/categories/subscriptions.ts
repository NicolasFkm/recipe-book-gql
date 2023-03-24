import { pubSub } from '@infra/pubsub';

const NEW_SUBSCRIPTION_EVENT = 'new_subscription_event';

const categoriesSubscriptions = {
  categoryCreated: {
    subscribe: (_: any, __: any, ctx: any) =>
      ctx.pubSub.asyncIterator(NEW_SUBSCRIPTION_EVENT),
    resolve: (payload: any) => payload,
  },
};

export default categoriesSubscriptions;
