// src/components/RegistrationForm.jsx
import React, { useState } from "react";
import { registerUserApi } from "./mockApi";

export default function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // success or error message
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!username.trim()) e.username = "Username is required.";
    if (!email.trim()) e.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Enter a valid email.";
    if (!password) e.password = "Password is required.";
    else if (password.length < 6) e.password = "Password must be at least 6 characters.";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setStatus(null);
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const saved = await registerUserApi({ username, email, password });
      setStatus({ type: "success", message: `Registered successfully! id=${saved.id}` });
      // optionally clear form
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setStatus({ type: "error", message: err?.message || "Registration failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 border rounded-md shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Controlled Registration Form</h2>

      {status && (
        <div
          className={`mb-3 p-2 rounded ${
            status.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <label className="block mb-1">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
          placeholder="Your username"
        />
        {errors.username && <div className="text-red-600 text-sm mb-2">{errors.username}</div>}

        <label className="block mb-1">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
          placeholder="you@example.com"
          type="email"
        />
        {errors.email && <div className="text-red-600 text-sm mb-2">{errors.email}</div>}

        <label className="block mb-1">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
          placeholder="Minimum 6 characters"
          type="password"
        />
        {errors.password && <div className="text-red-600 text-sm mb-2">{errors.password}</div>}

        <div className="flex items-center gap-2">
          <button
            type="submit"
            className={`px-4 py-2 rounded text-white ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <button
            type="button"
            onClick={() => {
              setUsername("");
              setEmail("");
              setPassword("");
              setErrors({});
              setStatus(null);
            }}
            className="px-3 py-2 border rounded"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
