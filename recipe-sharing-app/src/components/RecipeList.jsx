import React from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import ToggleFavoriteButton from './ToggleFavoriteButton';

const RecipeList = () => {
  // prefer filteredRecipes, fallback to recipes
  const filteredRecipes = useRecipeStore((s) => s.filteredRecipes);
  const recipes = useRecipeStore((s) => s.recipes);

  const list = filteredRecipes && filteredRecipes.length > 0 ? filteredRecipes : recipes;

  if (!list || list.length === 0) {
    return <div style={{ padding: 20 }}>No recipes found.</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      {list.map((r) => (
        <div
          key={r.id}
          style={{
            border: '1px solid #ddd',
            padding: '12px',
            margin: '12px 0',
            borderRadius: 8,
            background: '#fff'
          }}
        >
          <h3 style={{ margin: 0 }}>{r.title}</h3>
          <p style={{ marginTop: 8 }}>{r.description}</p>

          <div style={{ marginTop: 8, display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Link to={`/recipes/${r.id}`} style={{ textDecoration: 'none' }}>View</Link>
            <Link to={`/recipes/${r.id}/edit`} style={{ textDecoration: 'none' }}>Edit</Link>
            <ToggleFavoriteButton recipeId={r.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
