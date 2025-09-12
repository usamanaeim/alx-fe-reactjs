import React, { useState } from 'react';
import { useRecipeStore } from '../stores/recipeStore';

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    addRecipe({ id: Date.now(), title: trimmedTitle, description: description.trim() });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '16px' }}>
      <input
        type="text"
        value={title}
        placeholder="Recipe title"
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '8px' }}
      />
      <textarea
        value={description}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '8px' }}
      />
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default AddRecipeForm;