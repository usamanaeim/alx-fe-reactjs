import React from 'react';
import { useRecipeStore } from './recipeStore';

function ToggleFavoriteButton({ recipeId }) {
  const favorites = useRecipeStore((s) => s.favorites);
  const addFavorite = useRecipeStore((s) => s.addFavorite);
  const removeFavorite = useRecipeStore((s) => s.removeFavorite);

  const isFav = favorites.includes(recipeId);

  const onClick = () => {
    if (isFav) removeFavorite(recipeId);
    else addFavorite(recipeId);
  };

  return (
    <button onClick={onClick} style={{ marginLeft: 8 }}>
      {isFav ? '★ Unfavorite' : '☆ Favorite'}
    </button>
  );
}

export default ToggleFavoriteButton;
