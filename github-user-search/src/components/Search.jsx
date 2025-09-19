// src/components/Search.jsx
import React, { useState } from "react";
import { fetchUserData, searchUsers } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle basic username search
  const handleBasicSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await fetchUserData(username);
      setResults([data]); // wrap in array for consistency
    } catch (err) {
      setError("Looks like we can't find the user");
    } finally {
      setLoading(false);
    }
  };

  // Handle advanced search
  const handleAdvancedSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let query = username ? username : "";

      if (location) {
        query += `+location:${location}`;
      }
      if (minRepos) {
        query += `+repos:>${minRepos}`;
      }

      const users = await searchUsers(query);
      setResults(users);
    } catch (err) {
      setError("Error fetching users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">GitHub User Search</h1>

      {/* --- Basic Search Form --- */}
      <form onSubmit={handleBasicSearch} className="mb-6">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full rounded mb-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Search by Username
        </button>
      </form>

      {/* --- Advanced Search Form --- */}
      <form onSubmit={handleAdvancedSearch} className="mb-6">
        <h2 className="font-semibold mb-2">Advanced Search</h2>
        <input
          type="text"
          placeholder="Username (optional)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full rounded mb-2"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 w-full rounded mb-2"
        />
        <input
          type="number"
          placeholder="Minimum Repos"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="border p-2 w-full rounded mb-2"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Advanced Search
        </button>
      </form>

      {/* --- Results --- */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {results && (
        <div className="space-y-4">
          {results.map((user) => (
            <div
              key={user.id}
              className="border p-4 rounded flex items-center space-x-4"
            >
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-lg font-bold">{user.login}</h3>
                {user.location && <p>📍 {user.location}</p>}
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  View Profile
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
