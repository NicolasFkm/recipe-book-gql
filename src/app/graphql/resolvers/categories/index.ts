import categoriesMutation from './mutations';
import categoryQueries from './queries';
import categoriesSubscriptions from './subscriptions';

export default {
  Query: categoryQueries,
  Subscription: categoriesSubscriptions,
  Mutation: categoriesMutation,
};
