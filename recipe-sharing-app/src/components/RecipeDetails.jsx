import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRecipeStore } from '../stores/recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipeId = Number(id); // we expect numeric ids (Date.now())
  const recipe = useRecipeStore((s) => s.recipes.find((r) => r.id === recipeId));

  if (!recipe) {
    return (
      <div style={{ padding: 20 }}>
        <p>Recipe not found.</p>
        <Link to="/">Back to list</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      <div style={{ marginTop: 12 }}>
        <Link to={`/recipes/${recipeId}/edit`} style={{ marginRight: 12 }}>Edit</Link>
        <DeleteRecipeButton recipeId={recipeId} />
      </div>

      <div style={{ marginTop: 20 }}>
        <Link to="/">Back to recipes</Link>
      </div>
    </div>
  );
};

export default RecipeDetails;
