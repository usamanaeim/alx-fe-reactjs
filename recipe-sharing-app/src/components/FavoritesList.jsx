import React from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

function FavoritesList() {
  const favorites = useRecipeStore((s) => s.favorites);
  const recipes = useRecipeStore((s) => s.recipes);

  const favRecipes = favorites
    .map((id) => recipes.find((r) => r.id === id))
    .filter(Boolean);

  return (
    <div style={{ marginTop: 16 }}>
      <h2>My Favorites</h2>
      {favRecipes.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        favRecipes.map((r) => (
          <div key={r.id} style={{ border: '1px solid #eee', padding: 8, marginBottom: 8 }}>
            <h3 style={{ margin: 0 }}>{r.title}</h3>
            <p style={{ margin: '6px 0' }}>{r.description}</p>
            <Link to={`/recipes/${r.id}`}>View</Link>
          </div>
        ))
      )}
    </div>
  );
}

export default FavoritesList;
