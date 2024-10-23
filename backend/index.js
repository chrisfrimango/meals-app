const express = require("express");
path = require("path");
const axios = require("axios");
const dotenv = require("dotenv"),
  { Client } = require("pg");

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
  // user: process.env.DB_USER,
  // host: process.env.DB_HOST,
  // database: process.env.DB_DATABASE,
  // password: process.env.DB_PASSWORD,
  // port: process.env.DB_PORT,
});

client.connect();

// const cors = require("cors");
// app.use(cors());

const app = express(),
  port = process.env.PORT || 3000;

// app.get("/api", (_request, response) => {
//   response.send({ hello: "World" });
// });

app.get("/api/favorite", async (req, res) => {
  const { rows } = await client.query("SELECT * FROM recipieFavorite");
  res.send(rows);
});

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
  console.log(`Server running on http://localhost:${port}/`);
});
