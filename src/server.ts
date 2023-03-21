import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

//Images data

const recipesData = [
  {
    _id: 1,
    title: 'Stacked Brwonies',
    owner: 'Ella Olson',
    category: 'Desserts',
    url: 'https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg',
  },
];

// GraphQL Schema
const schema = buildSchema(`
  type Query {
    recipe(id: Int!): Recipe
  }
  type Recipe {
    _id: string;
    name: string;
    timeToPrep: number;
    servings: number;
    tags: string[];

    category: Category
    ingredients: Ingredient[];
    directions: Step[];
  }
`);

// Get single Image using id

function getRecipe(id: number) {
  for (const recipe of recipesData) {
    if (recipe._id === id) {
      return recipe;
    }
  }

  return null;
}

// Resolver
const root = {
  recipe: getRecipe,
};

//Create an express server and GraphQL endpoint
const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

//Listening to our server
app.listen(5000, () => {
  console.log('GraphQL server with Express running on localhost:5000/graphql');
});
