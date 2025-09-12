import React from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from '../stores/recipeStore';

const RecipeList = () => {
  // get filteredRecipes from store; fallback to recipes if filteredRecipes is empty
  const filteredRecipes = useRecipeStore((s) => s.filteredRecipes);
  const recipes = useRecipeStore((s) => s.recipes);

  const list = filteredRecipes && filteredRecipes.length > 0 ? filteredRecipes : recipes;

  if (!list || list.length === 0) return <div>No recipes found.</div>;

  return (
    <div>
      {list.map((r) => (
        <div key={r.id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
          <h3 style={{ margin: 0 }}>{r.title}</h3>
          <p style={{ marginTop: 6 }}>{r.description}</p>
          <div style={{ marginTop: 8 }}>
            <Link to={`/recipes/${r.id}`} style={{ marginRight: 8 }}>View</Link>
            <Link to={`/recipes/${r.id}/edit`}>Edit</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;

