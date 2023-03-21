import { Category } from './Category';
import { Ingredient } from './Ingredient';

export class Recipe {
  _id: string;
  name: string;
  timeToPrep: number;
  servings: number;
  tags: string[];

  category: Category;
  ingredients: Ingredient[];
  directions: string[];
}
