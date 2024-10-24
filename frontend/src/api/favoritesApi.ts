import { IRecipe } from "../pages/Recepies";

export const fetchFavoriteRecipesFromDb = async (): Promise<IRecipe[]> => {
  try {
    const response = await fetch("/api/favorites");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addFavoriteRecipeToDb = async (newFavorite: IRecipe) => {
  const { id, title, image, instructions, favorite } = newFavorite;

  try {
    const response = await fetch(`/api/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        title,
        image,
        instructions,
        favorite,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add recipe to favorites");
    }

    console.log("Recipe added to favorites");
    return true;
  } catch (error) {
    console.error("Error adding recipe to favorites", error);
    return false;
  }
};

export const deleteFavoriteRecipeFromDb = async (id: string) => {
  try {
    const response = await fetch(`/api/favorites/${id}`, { method: "DELETE" });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error("Error deleting recipe from favorites", error);
    return false;
  }
};