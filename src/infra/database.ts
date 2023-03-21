import { Measurement } from '@domain/enums/Measurement';
import { Category } from '@entities/Category';
import { Ingredient } from '@entities/Ingredient';
import { Item } from '@entities/Item';
import { Recipe } from '@entities/Recipe';

const category1: Category = {
  _id: '1',
  name: 'italian',
};

const item1: Item = {
  _id: '1',
  name: 'Spaghetti',
};

const item2: Item = {
  _id: '1',
  name: 'Egg',
};

const item3: Item = {
  _id: '1',
  name: 'Cheese',
};

const ingredient1: Ingredient = {
  _id: '1',
  item: item1,
  measurement: Measurement.KG,
  quantity: 0.2,
};

const ingredient2: Ingredient = {
  _id: '1',
  item: item2,
  measurement: Measurement.UNIT,
  quantity: 3,
};

const ingredient3: Ingredient = {
  _id: '1',
  item: item3,
  measurement: Measurement.KG,
  quantity: 0.2,
};

const recipe1: Recipe = {
  _id: '1',
  category: category1,
  name: 'Carbonara',
  timeToPrep: 30,
  servings: 1,
  tags: ['pasta'],
  ingredients: [ingredient1, ingredient2, ingredient3],
  directions: ['Boil the spaghetti', 'Mix the eggs with the cheese'],
};

export const database: {
  recipes: Recipe[];
  categories: Category[];
  items: Item[];
  ingredients: Ingredient[];
} = {
  recipes: [recipe1],
  categories: [category1],
  items: [item1, item2, item3],
  ingredients: [ingredient1, ingredient2, ingredient3],
};
