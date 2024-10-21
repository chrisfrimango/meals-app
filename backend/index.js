const express = require("express");
path = require("path");
const axios = require("axios");

const app = express(),
  port = process.env.PORT || 3000;

// app.get("/api", (_request, response) => {
//   response.send({ hello: "World" });
// });

app.get("/api/recipes", async (req, res) => {
  const letter = req.query.letter || "a";
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching recipes" });
  }
});

app.use(express.static(path.join(path.resolve(), "dist")));

app.listen(port, () => {
  console.log(`Redo på http://localhost:${port}/`);
});
