import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SearchBar from './components/SearchBar';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import EditRecipeForm from './components/EditRecipeForm';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';

function App() {
  return (
    <Router>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: 20 }}>
        <h1 style={{ textAlign: 'center' }}>Recipe Sharing App</h1>

        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Search + Add + Favorites + Recommendations + List */}
                <SearchBar />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
                  <div>
                    <AddRecipeForm />
                    <RecipeList />
                  </div>

                  <aside>
                    <FavoritesList />
                    <RecommendationsList />
                  </aside>
                </div>
              </>
            }
          />

          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/recipes/:id/edit" element={<EditRecipeForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
