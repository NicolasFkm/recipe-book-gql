import { database } from '@infra/database';

const categoryQueries = {
  categories: async () => {
    return database.categories;
  },
};

export default categoryQueries;
