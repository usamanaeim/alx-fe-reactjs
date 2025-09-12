import React from 'react';
import { useRecipeStore } from '../stores/recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  if (!recipes || recipes.length === 0) return <div>No recipes yet.</div>;

  return (
    <div>
      {recipes.map((r) => (
        <div key={r.id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
          <h3 style={{ margin: 0 }}>{r.title}</h3>
          <p style={{ marginTop: '6px' }}>{r.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;