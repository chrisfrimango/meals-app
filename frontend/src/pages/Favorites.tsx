import React, { useState } from "react";
import styled from "styled-components";
import { useLoaderData } from "react-router-dom";
import RecipeReviewCard from "../components/Card";
import { fetchFavoriteRecipesFromDb } from "../api/favoritesApi";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  color: #3d1716;
`;

const RecipeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  width: 100%;
`;

const Typography = styled.p`
  margin-bottom: 2rem;
  color: #3d1716;
`;

export interface IRecipe {
  id: string;
  title: string;
  image: string | null;
  instructions: string | null;
  ingredients: { name: string; measure: string }[];
  tags: string | null;
  favorite: boolean | null;
}

const Favorites: React.FC = () => {
  const favoriteRecipes = useLoaderData() as IRecipe[];
  const [favoriteRecipesData, setFavoriteRecipesData] =
    useState(favoriteRecipes);

  const updateFavorites = async () => {
    const updatedFavorites = await fetchFavoriteRecipesFromDb();
    setFavoriteRecipesData(updatedFavorites);
  };

  return (
    <Container>
      <Title>Favorites</Title>
      <RecipeGrid>
        {favoriteRecipes.length === 0 && (
          <Typography>No favorite recipes found</Typography>
        )}
        {favoriteRecipesData.map((favo) => (
          <RecipeReviewCard
            key={favo.id}
            recipe={favo}
            onFavoriteChange={updateFavorites}
          />
        ))}
      </RecipeGrid>
    </Container>
  );
};

export default Favorites;