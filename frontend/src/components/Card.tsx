import * as React from "react";
// import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
// import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IRecipe } from "./Recepies";

// interface ExpandMoreProps extends IconButtonProps {
//   expand: boolean;
// }

interface RecipeReviewCardProps {
  recipe: IRecipe;
  // expanded: boolean;
  // onExpandClick: () => void;
}

// const ExpandMore = styled((props: ExpandMoreProps) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme }) => ({
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
//   variants: [
//     {
//       props: ({ expand }) => !expand,
//       style: {
//         transform: "rotate(0deg)",
//       },
//     },
//     {
//       props: ({ expand }) => !!expand,
//       style: {
//         transform: "rotate(180deg)",
//       },
//     },
//   ],
// }));

const RecipeTitleStyled = {
  backgroundColor: "#079880",
  color: "white",
  margin: 0,
  padding: "1rem",
  fontSize: "1.5rem",
  textAlign: "center",
  background: "linear-gradient(135deg, #077469 0%, #105a2e 100%)",
};

const RecipeReviewCard: React.FC<RecipeReviewCardProps> = ({ recipe }) => {
  // const [expanded, setExpanded] = React.useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title={recipe.title} sx={RecipeTitleStyled} />
      <CardMedia
        component="img"
        height="194"
        image={recipe.image || ""}
        alt={recipe.title}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Instructions
        </Typography>
        <Typography sx={{ color: "text.secondary", marginBottom: "1rem" }}>
          {recipe.instructions?.substring(0, 200) + "..."}
        </Typography>
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
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon sx={{ color: "red" }} />
        </IconButton>
        {/* <ExpandMore
          expand={expanded}
          onClick={onExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore> */}
      </CardActions>
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ color: "text.secondary" }}>
            {recipe.instructions}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Ingredients:
          </Typography>
          {recipe.ingredients.map((ingredient, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{ color: "text.primary" }}
            >
              {ingredient.name}: {ingredient.measure}
            </Typography>
          ))}
        </CardContent>
      </Collapse> */}
    </Card>
  );
};

export default RecipeReviewCard;
