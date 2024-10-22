import React from "react";
import styled from "styled-components";
import { IRecipe } from "./Recepies";

const RecipeCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  gap: 1rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const RecipeTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: #262e03;
`;

const RecipeIngredients = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  justify-content: center;
  gap: 1rem;
`;

const RecipeIngredient = styled.li`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  align-items: baseline;
  color: #121604;
`;

const RecipeIngredientName = styled.span`
  font-weight: bold;
  text-align: left;
`;

const RecipeIngredientMeasure = styled.span`
  font-style: italic;
  text-align: left;
`;

interface RecipeCarsProps {
  recipe: IRecipe;
}

const RecipieCard: React.FC<RecipeCarsProps> = ({ recipe }) => {
  return (
    <RecipeCard key={recipe.title}>
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
    </RecipeCard>
  );
};

export default RecipieCard;
