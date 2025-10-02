import React from "react";
import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transform transition-transform duration-200 hover:-translate-y-1">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{recipe.summary}</p>

        {/* Link to recipe detail using React Router Link */}
        <Link
          to={`/recipe/${recipe.id}`}
          className="text-blue-600 hover:underline text-sm"
        >
          View Recipe →
        </Link>
      </div>
    </article>
  );
}
