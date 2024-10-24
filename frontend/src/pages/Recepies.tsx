import React, { useState } from "react";
import styled from "styled-components";
import RecipeReviewCard from "../components/Card";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
}

export interface IRecipes {
  meals: IMeal[];
}

const Recepies: React.FC = () => {
  const [search, setSearch] = useState("");
  const { recipesData, favoritesData } = useLoaderData() as {
    recipesData: IRecipe[];
    favoritesData: IRecipe[];
  };

  const navigate = useNavigate();

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
        {recipesData.map((recipe) => (
          <RecipeReviewCard
            key={recipe.id}
            recipe={recipe}
            favorite={favoritesData}
          />
        ))}
      </RecipeGrid>
    </Container>
  );
};

export default Recepies;
