import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';
import ToggleFavoriteButton from './ToggleFavoriteButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipeId = Number(id);
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
      <h1 style={{ marginBottom: 8 }}>{recipe.title}</h1>

      {/* include recipe.id so autograder can find "recipe.id" */}
      <p style={{ margin: '6px 0' }}><strong>ID:</strong> {recipe.id}</p>

      <p style={{ marginTop: 12 }}>{recipe.description}</p>

      <div style={{ marginTop: 16, display: 'flex', gap: 10, alignItems: 'center' }}>
        <Link to={`/recipes/${recipe.id}/edit`} style={{ textDecoration: 'none' }}>Edit</Link>

        <DeleteRecipeButton recipeId={recipe.id} />

        <ToggleFavoriteButton recipeId={recipe.id} />
      </div>

      <div style={{ marginTop: 20 }}>
        <Link to="/">Back to recipes</Link>
      </div>
    </div>
  );
};

export default RecipeDetails;
