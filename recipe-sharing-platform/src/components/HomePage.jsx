import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import recipesData from "../data.json"; // import mock data from src

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // With mock JSON in src, importing is simplest and fast
    setRecipes(recipesData);
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Discover Recipes
        </h1>
        <p className="text-gray-600 mt-2">
          Browse community recipes — click a recipe for details.
        </p>
      </header>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      </section>
    </main>
  );
}
