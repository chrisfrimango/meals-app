import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  addFavoriteRecipeToDb,
  deleteFavoriteRecipeFromDb,
} from "../api/favoritesApi";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  width: 100%;
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
  favorite: boolean | null;
  incoming_id: string;
}

export interface IRecipes {
  meals: IMeal[];
}

const Recepies: React.FC = () => {
  const [search, setSearch] = useState("");
  const { intialRecipesData } = useLoaderData() as {
    intialRecipesData: IRecipe[];
  };

  console.log("🚀 ~ Recepies ~ intialRecipesData:", intialRecipesData);
  const [recipes, setRecipes] = useState<IRecipe[]>(intialRecipesData || []);

  const navigate = useNavigate();

  const updateFavorite = async (id: string, isFavorite: boolean) => {
    try {
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.id === id ? { ...recipe, favorite: isFavorite } : recipe
        )
      );

      if (isFavorite) {
        const recipe = recipes.find((r) => r.id === id);
        if (recipe) await addFavoriteRecipeToDb(recipe);
      } else {
        await deleteFavoriteRecipeFromDb(id);
      }
    } catch (error) {
      console.error("Failed to update favorite status:", error);
    }
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    navigate(`/?search=${newSearch}`);
  };

  useEffect(() => {
    setRecipes(intialRecipesData || []);
  }, [intialRecipesData]);

  return (
    <Container>
      <Input
        type="text"
        onChange={handleSearch}
        value={search}
        placeholder="Search for a recipe"
      />
      <RecipeGrid>
        {recipes.map((recipe) => (
          <Card
            key={recipe.id}
            recipe={recipe}
            onFavoriteChange={updateFavorite}
            iconButton={
              <FavoriteIcon
                sx={{ color: `${recipe.favorite ? "red" : "grey"}` }}
              />
            }
          />
        ))}
      </RecipeGrid>
    </Container>
  );
};

export default Recepies;
