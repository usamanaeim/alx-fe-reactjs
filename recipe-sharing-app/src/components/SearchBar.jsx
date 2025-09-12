import React from 'react';
import { useRecipeStore } from '../stores/recipeStore';

function SearchBar() {
  const searchTerm = useRecipeStore((s) => s.searchTerm);
  const setSearchTerm = useRecipeStore((s) => s.setSearchTerm);

  return (
    <div style={{ margin: '12px 0', textAlign: 'center' }}>
      <input
        type="text"
        placeholder="Search recipes by title or description..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '90%',
          maxWidth: 600,
          padding: '10px',
          borderRadius: '6px',
          border: '1px solid #ccc',
        }}
      />
    </div>
  );
}

export default SearchBar;