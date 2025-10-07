import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

/*
Simple login page that simulates authentication.
It stores login state via a callback prop (we'll pass setAuth in App via context/props).
We will instead use localStorage to keep demo simple.
*/

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = () => {
    // simulate login
    localStorage.setItem("isAuthenticated", "true");
    if (onLogin) onLogin(true);
    // redirect to where the user wanted to go
    navigate(from, { replace: true });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-3">Login</h1>
      <p className="mb-4">You must log in to view protected pages.</p>
      <button onClick={handleLogin} className="px-4 py-2 bg-blue-600 text-white rounded">
        Log in (simulate)
      </button>
    </div>
  );
}
