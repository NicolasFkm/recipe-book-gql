import { pubSub } from '@infra/pubsub';

const NEW_SUBSCRIPTION_EVENT = 'new_subscription_event';

const categoriesSubscriptions = {
  categoryCreated: {
    subscribe: () => pubSub.asyncIterator([NEW_SUBSCRIPTION_EVENT]),
  },
};

export default categoriesSubscriptions;
