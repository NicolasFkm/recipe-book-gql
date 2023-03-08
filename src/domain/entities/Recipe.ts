import { Category } from "./Category";
import { Ingredient } from "./Ingredient";
import { Step } from "./Step";

export class Recipe {
    _id: string;
    name: string;
    timeToPrep: number;
    servings: number;
    tags: string[];

    category: Category
    ingredients: Ingredient[];
    directions: Step[];
}