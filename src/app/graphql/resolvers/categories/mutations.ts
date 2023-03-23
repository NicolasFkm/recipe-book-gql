import { database } from '@infra/database';
import { pubSub } from '@infra/pubsub';
import { v4 } from 'uuid';

const NEW_SUBSCRIPTION_EVENT = 'new_subscription_event';

const categoriesMutation = {
  createCategory: async (data: { name: string }) => {
    const category = { _id: v4(), name: data.name };
    database.categories.push(category);
    pubSub.publish(NEW_SUBSCRIPTION_EVENT, { newItem: category });

    return category;
  },
};

export default categoriesMutation;
