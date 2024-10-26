import React, { useEffect, useState } from "react";
import styled from "styled-components";
import RecipeReviewCard from "../components/Card";
import { useLoaderData, useNavigate } from "react-router-dom";
import { fetchFavoriteRecipesFromDb } from "../api/favoritesApi";
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
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const { intialRecipesData, favoritesData } = useLoaderData() as {
    intialRecipesData: IRecipe[];
    favoritesData: IRecipe[];
  };
  const [favoriteRecipesData, setFavoriteRecipesData] =
    useState<IRecipe[]>(favoritesData);

  console.log("🚀 ~ Recepies ~ intialRecipesData:", intialRecipesData);
  console.log("🚀 ~ Recepies ~ favoritesData:", favoritesData);

  const navigate = useNavigate();

  const updateFavoriteStatus = async () => {
    const recipesWithFavorite = intialRecipesData.map((recipe) => ({
      ...recipe,
      favorite: favoriteRecipesData.some(
        (favorite) => favorite.incoming_id === recipe.id
      ),
    }));
    setRecipes(recipesWithFavorite);
  };

  const updateFavorites = async () => {
    const updatedFavorites = await fetchFavoriteRecipesFromDb();
    setFavoriteRecipesData(updatedFavorites);
  };

  useEffect(() => {
    updateFavoriteStatus();
  }, [favoriteRecipesData]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    navigate(`/?search=${newSearch}`);
  };

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
          <RecipeReviewCard
            key={recipe.id}
            recipe={recipe}
            onFavoriteChange={updateFavorites}
            isFavoritePage={false}
          />
        ))}
      </RecipeGrid>
    </Container>
  );
};

export default Recepies;
