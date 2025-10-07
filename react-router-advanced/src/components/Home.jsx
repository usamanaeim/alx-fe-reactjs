import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-3">Home</h1>
      <p>Welcome — example links:</p>
      <ul className="mt-3 space-y-2">
        <li><Link to="/about" className="text-blue-600">About</Link></li>
        <li><Link to="/profile" className="text-blue-600">My Profile (protected)</Link></li>
        <li><Link to="/posts/1" className="text-blue-600">View Post #1 (dynamic)</Link></li>
      </ul>
    </div>
  );
}
