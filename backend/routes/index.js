const express = require("express");
const router = express.Router();

const recipesRouter = require("./recipes");
const favoritesRouter = require("./favorites");

router.use("/recipes", recipesRouter);
router.use("/favorites", favoritesRouter);
router.use("/favorites/:id", favoritesRouter);

module.exports = router;
