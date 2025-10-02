// src/components/HomePage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import recipesData from "../data.json";

const LOCAL_KEY = "recipes_custom";

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // read custom recipes from localStorage and merge with static data
    let custom = [];
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      custom = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(custom)) custom = [];
    } catch {
      custom = [];
    }
    // show custom recipes first (most recent), then base data
    setRecipes([...custom, ...recipesData]);
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Discover Recipes
          </h1>
          <p className="text-gray-600 mt-2">
            Browse community recipes — click a recipe for details.
          </p>
        </div>
        <div>
          <Link to="/add" className="inline-block bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700">
            + Add Recipe
          </Link>
        </div>
      </header>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((r) => (
            <Link
              key={r.id}
              to={`/recipe/${r.id}`}
              className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <RecipeCard recipe={r} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
