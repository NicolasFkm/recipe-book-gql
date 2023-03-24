import { mergeResolvers } from '@graphql-tools/merge';
import categoriesResolver from './categories';
import recipesResolver from './recipes';

const resolvers = [categoriesResolver, recipesResolver];

export default mergeResolvers(resolvers);
