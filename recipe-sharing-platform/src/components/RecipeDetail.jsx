import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import recipesData from "../data.json";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // id comes as string; convert to number
    const recipeId = Number(id);
    const found = recipesData.find((r) => r.id === recipeId);
    setRecipe(found || null);
  }, [id]);

  if (recipe === null) {
    // show not found or loading message
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-xl text-center">
          <h2 className="text-xl font-semibold mb-4">Recipe not found</h2>
          <p className="text-gray-600 mb-6">We couldn't find the recipe you're looking for.</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Go back
            </button>
            <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover" />

          <div className="p-6">
            <div className="flex items-start justify-between">
              <h1 className="text-2xl font-bold text-gray-900">{recipe.title}</h1>
              <div className="ml-4">
                <Link
                  to="/"
                  className="text-sm text-blue-600 hover:underline"
                >
                  ← Back
                </Link>
              </div>
            </div>

            <p className="text-gray-700 mt-4">{recipe.summary}</p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <section>
                <h2 className="text-lg font-semibold mb-3">Ingredients</h2>
                <ul className="list-disc list-inside text-gray-700">
                  {recipe.ingredients.map((ing, idx) => (
                    <li key={idx} className="py-1">{ing}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">Instructions</h2>
                <ol className="list-decimal list-inside text-gray-700 space-y-2">
                  {recipe.steps.map((step, idx) => (
                    <li key={idx} className="py-1">{step}</li>
                  ))}
                </ol>
              </section>
            </div>

            {/* Optional: action buttons */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => navigator.clipboard?.writeText(window.location.href)}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Copy Link
              </button>
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
