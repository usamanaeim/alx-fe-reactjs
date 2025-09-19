import { useState } from 'react';
import SearchBar from './components/SearchBar';
import UserCard from './components/UserCard';
import { searchUsers, getUser } from './services/githubService';

function App() {
  const [results, setResults] = useState([]); // array of users from search
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (q) => {
    if (!q) return setResults([]);
    setLoading(true);
    setError('');
    try {
      const data = await searchUsers(q);
      setResults(data.items || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch users. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '24px auto', padding: 16 }}>
      <h1>GitHub User Search</h1>

      <SearchBar onSearch={handleSearch} />

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        {results.map((u) => <UserCard key={u.id} user={u} />)}
      </div>
    </div>
  );
}

export default App;
