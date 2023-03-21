import { recipesWithIngredientArg } from '@domain/types/recipe';
import { database } from '@infra/database';

const recipeQueries = {
  recipes: async () => {
    return database.recipes;
  },
  recipe: async ({ id }: { id: string }) => {
    return database.recipes.find((recipe) => recipe._id === id);
  },
  recipesWithIngredient: ({ ingredientName }: recipesWithIngredientArg) => {
    return database.recipes.filter((recipe) =>
      recipe.ingredients.some(
        (ingredient) => ingredient.item.name === ingredientName
      )
    );
  },
};

export default recipeQueries;
