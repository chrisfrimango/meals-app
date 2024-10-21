import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  font-size: 1rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  border: 1px solid black;
  padding: 1rem;
  background-color: white;
  color: black;
`;

const RecipeTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-align: left;
`;

const RecipeIngredients = styled.ul`
  display: flex;
  flex-direction: column;
  text-align: left;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const RecipeIngredient = styled.li`
  font-size: 1rem;
  margin-bottom: 0.25rem;
  display: flex;
  gap: 1rem;
`;

const RecipeIngredientName = styled.span`
  font-weight: bold;
`;

const RecipeIngredientMeasure = styled.span`
  font-style: italic;
`;

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

const Recepies: React.FC = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [search, setSearch] = useState("");

  const fetchRecipes = async (): Promise<IRecipes | undefined> => {
    try {
      const response = await fetch(`/api/recipes?letter=${search}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: IRecipes = await response.json();
      console.log(data);
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

  const printRecipes = async () => {
    const recipes = await fetchRecipes();
    if (recipes) {
      const processedRecipes = destructureRecipes(recipes);
      setRecipes(processedRecipes);
    }
  };

  useEffect(() => {
    printRecipes();
  }, [search]);

  return (
    <>
      <Title>Recepies</Title>
      <Input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a recipe"
      />
      <Container>
        {recipes.map((recipe) => (
          <RecipeContainer key={recipe.title}>
            <RecipeTitle>{recipe.title}</RecipeTitle>
            <RecipeIngredients>
              {recipe.ingredients.map((ingredient) => (
                <RecipeIngredient key={ingredient.name}>
                  <RecipeIngredientName>{ingredient.name}</RecipeIngredientName>
                  <RecipeIngredientMeasure>
                    {ingredient.measure}
                  </RecipeIngredientMeasure>
                </RecipeIngredient>
              ))}
            </RecipeIngredients>
          </RecipeContainer>
        ))}
      </Container>
    </>
  );
};

export default Recepies;
