import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.github.com'
});

// optional: include token if VITE_APP_GITHUB_API_KEY is set
API.interceptors.request.use(config => {
  const token = import.meta.env.VITE_APP_GITHUB_API_KEY;
  if (token) {
    // You can use `Bearer` or `token` depending on your token type — GitHub accepts "token <PAT>"
    config.headers.Authorization = `token ${token}`;
  }
  return config;
});

export async function searchUsers(query) {
  if (!query) return { items: [] };
  const res = await API.get('/search/users', { params: { q: query } });
  return res.data; // contains .items array of users
}

export async function getUser(username) {
  const res = await API.get(`/users/${username}`);
  return res.data;
}
