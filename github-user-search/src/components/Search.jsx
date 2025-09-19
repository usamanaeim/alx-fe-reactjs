import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

export default function Search() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUser(null);
    setError('');
    const name = username.trim();
    if (!name) return;

    setLoading(true);
    try {
      const data = await fetchUserData(name);
      setUser(data);
    } catch (err) {
      // show the exact message the task requires
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '20px auto', padding: 16 }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username (e.g. torvalds)"
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit" style={{ padding: '8px 12px' }}>Search</button>
      </form>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {user && (
        <div style={{
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          border: '1px solid #ddd',
          padding: 12,
          borderRadius: 8,
          background: '#fff'
        }}>
          <img src={user.avatar_url} alt="avatar" style={{ width: 80, height: 80, borderRadius: 8 }} />
          <div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>
              {user.name || user.login}
            </div>
            {user.name && <div style={{ color: '#555' }}>({user.login})</div>}
            <div style={{ marginTop: 8 }}>
              <a href={user.html_url} target="_blank" rel="noreferrer">View on GitHub</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
