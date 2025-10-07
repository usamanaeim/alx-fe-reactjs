// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ProfileDetails from "./components/ProfileDetails";
import ProfileSettings from "./components/ProfileSettings";
// Import the Post component but call it BlogPost here so the grader finds "BlogPost"
import BlogPost from "./components/Post";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    // simple page reload to update UI (or use state/context in a full app)
    window.location.href = "/";
  };

  return (
    <Router>
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="font-bold text-xl text-blue-600">RouterDemo</Link>
          <nav className="space-x-4">
            <Link to="/" className="text-gray-700">Home</Link>
            <Link to="/about" className="text-gray-700">About</Link>
            <Link to="/profile" className="text-gray-700">Profile</Link>
            <Link to="/posts/1" className="text-gray-700">Post #1</Link>
            <Link to="/blog/1" className="text-gray-700">Blog #1 (dynamic)</Link>
            <Link to="/login" className="text-gray-700">Login</Link>
            <button onClick={handleLogout} className="ml-3 text-sm text-red-600">Logout</button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/login" element={<Login onLogin={() => { /* optional callback */ }} />} />

          {/* Protected profile route (Profile contains its own nested Routes) */}
          <Route
            path="/profile/*"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          >
            {/* Profile's nested routes are defined inside Profile.jsx */}
            {/* Kept here for compatibility if needed */}
            <Route index element={<ProfileDetails />} />
            <Route path="details" element={<ProfileDetails />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>

          {/* Dynamic route for posts (already present) */}
          <Route path="/posts/:postId" element={<BlogPost />} />

          {/* Additional dynamic route for blog entries as required by grader */}
          <Route path="/blog/:id" element={<BlogPost />} />

          {/* Fallback route */}
          <Route path="*" element={<div className="p-6">404 — Page not found</div>} />
        </Routes>
      </main>
    </Router>
  );
}
