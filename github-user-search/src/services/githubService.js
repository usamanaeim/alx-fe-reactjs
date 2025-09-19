import axios from 'axios';

export async function fetchUserData(username) {
  if (!username) return null;

  try {
    const res = await axios.get(`https://api.github.com/users/${encodeURIComponent(username)}`);
    return res.data; // contains avatar_url, name, html_url, login, etc.
  } catch (err) {
    // forward the error so caller can show "Looks like we cant find the user"
    throw err;
  }
}
