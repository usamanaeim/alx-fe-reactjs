import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipeStore } from '../stores/recipeStore';

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    // optional: simple confirm
    if (!window.confirm('Delete this recipe?')) return;
    deleteRecipe(recipeId);
    navigate('/'); // go back to list after delete
  };

  return <button onClick={handleDelete} style={{ backgroundColor: '#d9534f', color: 'white' }}>Delete</button>;
};

export default DeleteRecipeButton;
