### START FUNCTION
// src/App.jsx
import './App.css';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';

function App() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 20 }}>
      <h1>Recipe Sharing App</h1>

      <AddRecipeForm />

      <RecipeList />
    </div>
  );
}

export default App;
### END FUNCTION
