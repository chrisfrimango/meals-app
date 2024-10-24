const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  const favorites = await db.getFavorites();
  res.json(favorites);
});

router.post("/", async (req, res) => {
  console.log("req.body");
  const { id, title, image, instructions, favorite } = req.body;
  try {
    const result = await db.addFavorite(
      id,
      title,
      image,
      instructions,
      favorite
    );
    res.send({ message: "Recipe added to favorites", result });
  } catch (error) {
    console.error("Failed to add recipe to favorites", error);
    res.status(500).send({ message: "Failed to add recipe to favorites" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await db.deleteFavorite(id);
  res.send({ message: "Recipe deleted from favorites", result });
});


module.exports = router;
