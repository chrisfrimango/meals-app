interface IMeal {
  idMeal: string;
  strMeal: string;
  [key: string]: string | null;
}

interface IRecipe {
  title: string;
  ingredients: { name: string; measure: string }[];
}

interface IRecipes {
  meals: IMeal[];
}

const fetchRecipes = async (letter: string): Promise<IRecipes | undefined> => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: IRecipes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const destructureRecipes = (recipes: IRecipes): IRecipe[] => {
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

    return {
      title: meal.strMeal,
      ingredients,
    };
  });
};

const printRecipesOnLetter = async (letter: string) => {
  const recipes = await fetchRecipes(letter);
  if (recipes) {
    const processedRecipes = destructureRecipes(recipes);
    console.log(processedRecipes);
  } else {
    console.log(`No recipes found for letter ${letter}`);
  }
};

printRecipesOnLetter("x");
