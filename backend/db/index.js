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
      const recipeResult = await pool.query(recipeQuery, recipeValues);
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

      return recipeResult.rows[0];
    } catch (error) {
      console.error("Error adding favorite recipe", error);
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
};
