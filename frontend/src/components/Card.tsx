import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IRecipe } from "../pages/Recepies";
import {
  addFavoriteRecipeToDb,
  deleteFavoriteRecipeFromDb,
} from "../api/favoritesApi";
interface RecipeReviewCardProps {
  recipe: IRecipe;
  onFavoriteChange: () => void;
  isFavoritePage: boolean;
}

const RecipeImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const RecipeTitleStyled = {
  backgroundColor: "#079880",
  color: "white",
  margin: 0,
  padding: "1rem",
  fontSize: "1.5rem",
  textAlign: "center",
  background: "linear-gradient(135deg, #077469 0%, #105a2e 100%)",
};

const RecipeReviewCard: React.FC<RecipeReviewCardProps> = ({
  recipe,
  onFavoriteChange = () => {},
  isFavoritePage,
}) => {
  const [isFavorite, setIsFavorite] = useState(recipe.favorite || false);

  const handleFavorites = async () => {
    const updateFavorite = !isFavorite;
    if (updateFavorite) {
      const newFavorite = { ...recipe, favorite: updateFavorite };
      await addFavoriteRecipeToDb(newFavorite);
      console.log("Recipe added to favorites");
      setIsFavorite(true);
      onFavoriteChange();
    } else {
      await deleteFavoriteRecipeFromDb(recipe.id);
      setIsFavorite(false);
      onFavoriteChange();
      console.log("Recipe deleted from favorites");
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title={recipe.title} sx={RecipeTitleStyled} />
      {/* <CardMedia
        component="img"
        height="194"
        image={recipe.image}
        alt={recipe.title}
      /> */}
      {recipe.image && (
        <RecipeImage src={`${recipe.image}` || ""} alt={recipe.title} />
      )}
      <CardContent>
        {recipe.instructions && (
          <>
            <Typography variant="h6" gutterBottom>
              Instructions
            </Typography>
            <Typography sx={{ color: "text.secondary", marginBottom: "1rem" }}>
              {recipe.instructions?.substring(0, 200) + "..."}
            </Typography>
          </>
        )}
        {recipe.ingredients && (
          <>
            <Typography variant="h6" gutterBottom>
              Ingredients:
            </Typography>
            {recipe.ingredients.map((ingredient, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{ color: "text.secondary" }}
              >
                {ingredient.name}: {ingredient.measure}
              </Typography>
            ))}
          </>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleFavorites}>
          {isFavoritePage ? (
            <DeleteForeverIcon sx={{ color: "grey" }} />
          ) : (
            <FavoriteIcon sx={{ color: `${isFavorite ? "red" : "grey"}` }} />
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default RecipeReviewCard;
