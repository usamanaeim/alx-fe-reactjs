// src/services/githubService.js
import axios from 'axios';

const API = axios.create({ baseURL: 'https://api.github.com' });

// attach token if provided via Vite env
API.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_APP_GITHUB_API_KEY;
  if (token) config.headers.Authorization = `token ${token}`;
  return config;
});

/**
 * searchUsersAdvanced
 * @param {Object} opts
 *  - username (string): basic term to search (can be login or name)
 *  - location (string)
 *  - minRepos (number)
 *  - page (number) default 1
 *  - per_page (number) default 30
 *  - fetchDetails (boolean) default true -> fetch /users/:login for extra info
 *
 * Returns { items: [userDetailsOrBasic], total_count }
 */
export async function searchUsersAdvanced({
  username = '',
  location = '',
  minRepos = 0,
  page = 1,
  per_page = 30,
  fetchDetails = true,
}) {
  // build the q query string using GitHub search qualifiers
  const qParts = [];
  if (username) qParts.push(username);
  if (location) qParts.push(`location:${location}`);
  if (minRepos && Number(minRepos) > 0) qParts.push(`repos:>=${Number(minRepos)}`);
  const q = qParts.length ? qParts.join(' ') : 'type:user';

  const res = await API.get('/search/users', { params: { q, per_page, page } });
  const { items = [], total_count = 0 } = res.data;

  if (!fetchDetails) return { items, total_count };

  // fetch full user details for each item (parallel). Be careful with rate limits.
  const detailed = await Promise.all(
    items.map(async (u) => {
      try {
        const r = await API.get(`/users/${u.login}`);
        return r.data;
      } catch (err) {
        // if details fail, return the basic item
        return u;
      }
    })
  );

  return { items: detailed, total_count };
}

/**
 * fetchUserData(username)
 * keep for single-user lookup compatibility with earlier tasks
 */
export async function fetchUserData(username) {
  if (!username) return null;
  const res = await API.get(`/users/${encodeURIComponent(username)}`);
  return res.data;
}
