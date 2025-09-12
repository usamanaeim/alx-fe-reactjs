import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipeStore } from '../stores/recipeStore';

const EditRecipeForm = () => {
  const { id } = useParams();
  const recipeId = Number(id);
  const navigate = useNavigate();

  const recipe = useRecipeStore((s) => s.recipes.find((r) => r.id === recipeId));
  const updateRecipe = useRecipeStore((s) => s.updateRecipe);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title || '');
      setDescription(recipe.description || '');
    }
  }, [recipe]);

  if (!recipe) {
    return (
      <div style={{ padding: 20 }}>
        <p>Recipe not found.</p>
        <button onClick={() => navigate('/')}>Back to list</button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateRecipe({ id: recipeId, title: title.trim(), description: description.trim() });
    // after update, go back to details page
    navigate(`/recipes/${recipeId}`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: 'block', width: '100%', padding: 8, marginBottom: 8 }}
        />
        <textarea
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          style={{ display: 'block', width: '100%', padding: 8, marginBottom: 8 }}
        />
        <button type="submit" style={{ marginRight: 8 }}>Save</button>
        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
      </form>
    </div>
  );
};

export default EditRecipeForm;
