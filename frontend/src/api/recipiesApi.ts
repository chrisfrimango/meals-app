import { IRecipes } from "../pages/Recepies";
import { IRecipe } from "../pages/Recepies";
import { fetchFavoriteRecipesFromDb } from "./favoritesApi";

export const fetchRecipes = async (
  search: string
): Promise<IRecipes | undefined> => {
  try {
    const response = await fetch(`/api/recipes?letter=${search}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: IRecipes = await response.json();
    return data.meals ? data : { meals: [] };
  } catch (error) {
    console.error(error);
    return { meals: [] };
  }
};

export const destructureRecipes = async (
  recipes: IRecipes
): Promise<IRecipe[]> => {
  if (!recipes || !recipes.meals) {
    return [];
  }

  const favoriteRecipes = await fetchFavoriteRecipesFromDb();

  return recipes.meals.map((meal) => {
    const ingredients = Object.entries(meal).reduce((acc, [key, value]) => {
      if (key.startsWith("strIngredient") && value) {
        const index = key.slice("strIngredient".length);
        const measureKey = `strMeasure${index}`;
        const measure = meal[measureKey] as string;
        if (measure) {
          acc.push({ name: value as string, measure });
        }
      }
      return acc;
    }, [] as { name: string; measure: string }[]);

    const isFavorite = favoriteRecipes.some(
      (fav) => fav.title === meal.strMeal
    );

    return {
      id: meal.idMeal,
      incoming_id: meal.idMeal,
      image: meal.strMealThumb,
      title: meal.strMeal,
      ingredients,
      instructions: meal.strInstructions,
      tags: meal.strTags,
      favorite: isFavorite,
    };
  });
};
