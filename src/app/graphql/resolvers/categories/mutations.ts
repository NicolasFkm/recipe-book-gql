import { database } from '@infra/database';
import { pubSub } from '@infra/pubsub';
import { v4 } from 'uuid';

const NEW_SUBSCRIPTION_EVENT = 'new_subscription_event';

type CategoryInput = {
  name: string;
};

const categoriesMutation = {
  createCategory: (_: any, category: CategoryInput, ctx: any) => {
    console.log('Create Category', category.name);
    const newCategory = { _id: v4(), name: category.name };
    database.categories.push(newCategory);

    ctx.pubSub.publish(NEW_SUBSCRIPTION_EVENT, newCategory);

    return newCategory;
  },
};

export default categoriesMutation;
