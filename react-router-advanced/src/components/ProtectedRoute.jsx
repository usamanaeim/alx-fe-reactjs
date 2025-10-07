import React from "react";
import { Navigate, useLocation } from "react-router-dom";

/**
 * ProtectedRoute props:
 * - children: element to render if authenticated
 *
 * This checks a simple auth indicator (localStorage.isAuthenticated)
 * and redirects to /login if not authenticated, passing the original location
 */
export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const isAuth = localStorage.getItem("isAuthenticated") === "true";

  if (!isAuth) {
    // redirect to login and keep where user wanted to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
