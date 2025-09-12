import React from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from '../stores/recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((s) => s.recipes);

  if (!recipes || recipes.length === 0) return <div>No recipes yet.</div>;

  return (
    <div>
      {recipes.map((r) => (
        <div key={r.id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
          <h3 style={{ margin: 0 }}>{r.title}</h3>
          <p style={{ marginTop: 6 }}>{r.description}</p>
          <div style={{ marginTop: 8 }}>
            <Link to={`/recipes/${r.id}`} style={{ marginRight: 8 }}>View</Link>
            <Link to={`/recipes/${r.id}/edit`} style={{ marginRight: 8 }}>Edit</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;