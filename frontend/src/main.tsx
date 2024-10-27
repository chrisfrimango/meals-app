import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Favorites from "./pages/Favorites.tsx";
import Recepies from "./pages/Recepies.tsx";
import { fetchFavoriteRecipesFromDb } from "./api/favoritesApi";
import { fetchRecipes, destructureRecipes } from "./api/recipiesApi";

const recipesLoader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const search = url.searchParams.get("search") || "";

  try {
    const rawRecipes = await fetchRecipes(search);
    const initialRecipesData = rawRecipes
      ? await destructureRecipes(rawRecipes)
      : [];

    return {
      intialRecipesData: initialRecipesData,
    };
  } catch (error) {
    console.error("Error in combinedLoader", error);
    return {
      intialRecipesData: [],
    };
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        index: true,
        element: <Recepies />,
        loader: recipesLoader,
      },
      {
        path: "/favorites",
        element: <Favorites />,
        loader: async () => {
          return fetchFavoriteRecipesFromDb();
        },
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
