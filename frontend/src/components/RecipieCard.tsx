import React from "react";
import styled from "styled-components";
import { IRecipe } from "./Recepies";

const RecipeCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid none;
  border-radius: 8px;
  background-color: #e9e9e9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    box-shadow: 0 8px 12px rgba(210, 206, 206, 0.2),
      0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const RecipeTitle = styled.h2`
  background-color: #079880;
  color: white;
  margin: 0;
  padding: 1rem;
  font-size: 1.5rem;
  text-align: center;
  background: linear-gradient(135deg, #077469 0%, #105a2e 100%);
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const RecipeIngredients = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
`;

const RecipeIngredient = styled.li`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.5rem;
  align-items: baseline;
  color: #121604;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`;

const RecipeIngredientName = styled.span`
  font-weight: 600;
  text-align: left;
`;

const RecipeIngredientMeasure = styled.span`
  font-style: italic;
  text-align: left;
  font-size: 0.8rem;
`;

interface RecipeCarsProps {
  recipe: IRecipe;
}

const RecipieCard: React.FC<RecipeCarsProps> = ({ recipe }) => {
  return (
    <RecipeCard>
      <RecipeTitle>{recipe.title}</RecipeTitle>
      <RecipeImage src={recipe.image} alt={recipe.title} />
      <RecipeIngredients>
        {recipe.ingredients.map((ingredient, index) => (
          <RecipeIngredient key={index}>
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
