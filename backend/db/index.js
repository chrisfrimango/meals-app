const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.PGURI,
});

module.exports = {
  getFavorites: async () => {
    const { rows } = await pool.query("SELECT * FROM recipieFavorite");
    return rows;
  },

  addFavorite: async (id, title, image, instructions, favorite) => {
    try {
      const recipeQuery = `
        INSERT INTO recipieFavorite (title, image_url, instructions, incoming_id, favorite)
        VALUES ($1, $2, $3, $4, $5)
      `;

      const recipeValues = [title, image, instructions, id, favorite];
      console.log("🚀 ~ addFavorite: ~ recipeValues:", recipeValues);
      const recipeResult = await pool.query(recipeQuery, recipeValues);
      console.log("🚀 ~ addFavorite: ~ recipeResult:", recipeResult);
      // const recipeId = recipeResult.rows[0].id;

      // if (ingredients && ingredients.length > 0) {
      //   const ingredientQuery = `
      //   INSERT INTO ingredients (recipe_id, name, measurement)
      //   VALUES ($1, $2, $3)
      //   `;

      //   for (const ingredient of ingredients) {
      //     const ingredientValues = [
      //       recipeId,
      //       ingredient.name,
      //       ingredient.measure,
      //     ];
      //     await pool.query(ingredientQuery, ingredientValues);
      //   }
      // }
      console.log("🚀 ~ addFavorite: ~ recipeResult:", recipeResult.rows[0]);

      return recipeResult.rows[0];
    } catch (error) {
      console.error("Error adding favorite recipe", error);
      console.error("🚀 ~ addFavorite: ~ error:", error.message);
      if (error.code) {
        console.error("🚀 ~ addFavorite: ~ error:", error.code);
      }
      throw error;
    }
  },

  deleteFavorite: async (id) => {
    const { rows } = await pool.query(
      "DELETE FROM recipieFavorite WHERE id = $1",
      [id]
    );
    return rows;
  },

  checkFavoriteExists: async (id) => {
    const { rows } = await pool.query(
      "SELECT EXISTS(SELECT 1 FROM recipieFavorite WHERE incoming_id = $1)",
      [id]
    );
    return rows[0].exists;
  },
};
