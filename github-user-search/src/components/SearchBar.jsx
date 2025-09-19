import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(q.trim());
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search GitHub users..."
        style={{ flex: 1, padding: 8 }}
      />
      <button type="submit" style={{ padding: '8px 12px' }}>Search</button>
    </form>
  );
}
