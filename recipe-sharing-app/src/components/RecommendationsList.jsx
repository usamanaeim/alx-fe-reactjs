import React from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

function RecommendationsList() {
  const recommendations = useRecipeStore((s) => s.recommendations);
  const generateRecommendations = useRecipeStore((s) => s.generateRecommendations);

  return (
    <div style={{ marginTop: 16 }}>
      <h2>Recommended For You</h2>
      <button onClick={generateRecommendations} style={{ marginBottom: 8 }}>
        Refresh Recommendations
      </button>
      {(!recommendations || recommendations.length === 0) ? (
        <p>No recommendations yet. Favorite a few recipes to get suggestions.</p>
      ) : (
        recommendations.map((r) => (
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

export default RecommendationsList;
