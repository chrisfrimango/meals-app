import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import RecipieCard from "./RecipieCard";
import RecipeReviewCard from "./Card";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #3d1716;
`;

const Input = styled.input`
  font-size: 1rem;
  padding: 0.5rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 300px;
  text-align: center;
  background-color: #280707;
  color: #c1aaaa;
  border-radius: 8px;
  border: none;
`;

const RecipeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  width: 100%;
`;

interface IMeal {
  idMeal: string;
  strMeal: string;
  [key: string]: string | null;
}

export interface IRecipe {
  id: string;
  title: string;
  image: string | null;
  instructions: string | null;
  ingredients: { name: string; measure: string }[];
  tags: string | null;
}

interface IRecipes {
  meals: IMeal[];
}

const Recepies: React.FC = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [search, setSearch] = useState("");
  // const [expandedCards, setExpandedCards] = useState<{
  //   [key: string]: boolean;
  // }>({});

  // const handleExpandClick = (id: string) => {
  //   setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  // };

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

  const fetchFavoriteRecipesFromDb = async (): Promise<
    IRecipe[] | undefined
  > => {
    try {
      const response = await fetch("/api/favorite");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: IRecipe[] = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFavoriteRecipesFromDb();
  }, []);

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
        id: meal.idMeal,
        image: meal.strMealThumb,
        title: meal.strMeal,
        ingredients,
        instructions: meal.strInstructions,
        tags: meal.strTags,
      };
    });
  };

  const printRecipes = async () => {
    const recipes = await fetchRecipes();
    if (recipes) {
      const processedRecipes = destructureRecipes(recipes);
      console.log(processedRecipes);
      setRecipes(processedRecipes);
    }
  };

  useEffect(() => {
    printRecipes();
  }, [search]);

  return (
    <Container>
      <Title>Recepies</Title>
      <Input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a recipe"
      />
      <RecipeGrid>
        {recipes.map((recipe) => (
          // <RecipieCard key={recipe.id} recipe={recipe} />
          <RecipeReviewCard
            key={recipe.id}
            recipe={recipe}
            // expanded={expandedCards[recipe.id] || false}
            // onExpandClick={() => handleExpandClick(recipe.id)}
          />
        ))}
      </RecipeGrid>
    </Container>
  );
};

export default Recepies;
