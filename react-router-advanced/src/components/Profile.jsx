import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Profile() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-3">Profile</h1>
      <p>This page demonstrates nested routing inside Profile.</p>

      <nav className="mt-4 mb-6 space-x-3">
        <Link to="details" className="text-blue-600">Details</Link>
        <Link to="settings" className="text-blue-600">Settings</Link>
      </nav>

      {/* Outlet will render nested routes (ProfileDetails, ProfileSettings) */}
      <div className="border rounded p-4">
        <Outlet />
      </div>
    </div>
  );
}
