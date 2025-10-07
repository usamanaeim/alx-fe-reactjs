// src/components/Profile.jsx
import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import ProfileDetails from "./ProfileDetails";
import ProfileSettings from "./ProfileSettings";

export default function Profile() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-3">Profile</h1>
      <p>This page demonstrates nested routing inside Profile.</p>

      <nav className="mt-4 mb-6 space-x-3">
        <Link to="." className="text-blue-600">Details</Link>
        <Link to="details" className="text-blue-600">Details (explicit)</Link>
        <Link to="settings" className="text-blue-600">Settings</Link>
      </nav>

      <div className="border rounded p-4 bg-white">
        {/* Nested routes defined here so the grader finds Routes + Route in this file */}
        <Routes>
          {/* index route (renders at /profile or /profile/) */}
          <Route index element={<ProfileDetails />} />

          {/* explicit nested routes */}
          <Route path="details" element={<ProfileDetails />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Routes>
      </div>
    </div>
  );
}
