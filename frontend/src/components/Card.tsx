import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { IRecipe } from "../pages/Recepies";
import {
  addFavoriteRecipeToDb,
  deleteFavoriteRecipeFromDb,
} from "../api/favoritesApi";
interface RecipeReviewCardProps {
  recipe: IRecipe;
  onFavoriteChange: (id: string, isFavorite: boolean) => void;
  iconButton: React.ReactNode;
}

const RecipeTitleStyled = {
  backgroundColor: "#079880",
  color: "white",
  margin: 0,
  padding: "1rem",
  fontSize: "1.5rem",
  textAlign: "center",
  background: "linear-gradient(135deg, #077469 0%, #105a2e 100%)",
};

const RecipeCard: React.FC<RecipeReviewCardProps> = ({
  recipe,
  onFavoriteChange,
  iconButton,
}) => {
  const handleFavorites = async () => {
    const newFavoriteStatus = !recipe.favorite;
    try {
      if (newFavoriteStatus) {
        console.log("Adding favorite recipe:", recipe.id);
        const success = await addFavoriteRecipeToDb({
          ...recipe,
          incoming_id: recipe.id,
          favorite: true,
        });
        if (success) {
          onFavoriteChange(recipe.id, true);
        }
      } else {
        console.log("Deleting favorite recipe:", recipe.id);
        await deleteFavoriteRecipeFromDb(recipe.id);
        onFavoriteChange(recipe.id, false);
      }
    } catch (error) {
      console.error("Failed to update favorite status:", error);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title={recipe.title} sx={RecipeTitleStyled} />
      {recipe.image && (
        <CardMedia
          component="img"
          height="194"
          image={recipe.image}
          alt={recipe.title}
        />
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
          {iconButton}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
