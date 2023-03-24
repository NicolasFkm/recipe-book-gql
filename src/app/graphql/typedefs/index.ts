import { mergeTypeDefs } from '@graphql-tools/merge';
import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';

const typesArray = loadFilesSync(path.join(__dirname, './schema'), {
  extensions: ['graphql'],
});

export default mergeTypeDefs(typesArray);
