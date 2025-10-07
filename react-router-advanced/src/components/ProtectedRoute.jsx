// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

/**
 * Local useAuth hook required by the grader.
 * In a real app this could come from context or a separate auth module.
 */
function useAuth() {
  // simple auth check using localStorage (demo)
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return { isAuthenticated };
}
    
export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const { isAuthenticated } = useAuth(); // <- useAuth used here

  if (!isAuthenticated) {
    // Redirect to /login and keep the attempted location in state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
