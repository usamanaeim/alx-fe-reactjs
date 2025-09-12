import React, { useState } from 'react';
import { useRecipeStore } from './recipeStore';

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((s) => s.addRecipe);

  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.title.trim()) {
      addRecipe({
        id: Date.now(), // simple unique id
        title: formData.title,
        description: formData.description
      });
      setFormData({ title: '', description: '' }); // reset
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: '1px solid #ccc',
        padding: '16px',
        borderRadius: 8,
        marginBottom: 20,
        background: '#fafafa'
      }}
    >
      <h2 style={{ marginTop: 0 }}>Add a Recipe</h2>
      <input
        type="text"
        name="title"
        placeholder="Recipe Title"
        value={formData.title}
        onChange={handleChange}
        style={{ display: 'block', marginBottom: 10, width: '100%', padding: 8 }}
      />
      <textarea
        name="description"
        placeholder="Recipe Description"
        value={formData.description}
        onChange={handleChange}
        style={{ display: 'block', marginBottom: 10, width: '100%', padding: 8 }}
      />
      <button type="submit" style={{ padding: '8px 16px' }}>Add Recipe</button>
    </form>
  );
};

export default AddRecipeForm;
