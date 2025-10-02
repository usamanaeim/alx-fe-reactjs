// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import RecipeDetail from "./components/RecipeDetail";
import AddRecipeForm from "./components/AddRecipeForm";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-blue-600">RecipeShare</Link>
            <nav className="space-x-3">
              <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
              <Link to="/add" className="inline-block bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700">Add Recipe</Link>
            </nav>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/add" element={<AddRecipeForm />} />
        </Routes>
      </div>
    </Router>
  );
}
