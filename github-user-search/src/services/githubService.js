// src/services/githubService.js
import axios from "axios";

// Base URL for GitHub API
const BASE_URL = "https://api.github.com";

// Fetch a single user by username (basic search)
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Advanced search: users by criteria (location, repo count, etc.)
export const searchUsers = async (query) => {
  try {
    // query should be formatted like: "john+location:egypt+repos:>10"
    const response = await axios.get(
      `${BASE_URL}/search/users?q=${query}`
    );
    return response.data.items; // GitHub wraps results in "items"
  } catch (error) {
    throw error;
  }
};
