// src/components/Search.jsx
import React, { useState } from 'react';
import { searchUsersAdvanced } from '../services/githubService';

export default function Search() {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10); // page size
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // perform search (pageReset true resets results for new query)
  const doSearch = async (pageToLoad = 1, pageReset = false) => {
    setError('');
    if (pageReset) {
      setResults([]);
      setTotal(0);
      setPage(1);
    }
    setLoading(true);
    try {
      const { items, total_count } = await searchUsersAdvanced({
        username,
        location,
        minRepos: minRepos ? Number(minRepos) : 0,
        page: pageToLoad,
        per_page: perPage,
        fetchDetails: true,
      });

      setTotal(total_count || 0);
      if (pageToLoad === 1 || pageReset) setResults(items || []); else setResults((s) => [...s, ...(items || [])]);
      setPage(pageToLoad);
    } catch (err) {
      console.error(err);
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    doSearch(1, true);
  };

  const loadMore = () => {
    if (results.length >= total) return;
    doSearch(page + 1, false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 items-end">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Username or keyword</label>
          <input value={username} onChange={(e)=>setUsername(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="e.g. torvalds" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input value={location} onChange={(e)=>setLocation(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="e.g. Cairo" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Min repos</label>
          <input value={minRepos} onChange={(e)=>setMinRepos(e.target.value)} type="number" min="0" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="0" />
        </div>

        <div className="col-span-4">
          <button type="submit" className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700">Search</button>
          <button type="button" onClick={() => { setUsername(''); setLocation(''); setMinRepos(''); setResults([]); setTotal(0); }} className="ml-2 px-3 py-2 border rounded-md">Clear</button>
        </div>
      </form>

      <div className="mt-6">
        {loading && <div className="text-sm text-gray-500">Loading...</div>}
        {error && <div className="mt-2 text-sm text-red-600">{error}</div>}

        <div className="mt-4 grid gap-4">
          {results.map((user) => (
            <div key={user.id} className="p-4 bg-white rounded shadow-sm flex gap-4 items-start">
              <img src={user.avatar_url} alt="avatar" className="w-16 h-16 rounded"/>
              <div>
                <div className="font-semibold text-lg">
                  {user.name ? user.name : user.login} <span className="text-sm text-gray-500">({user.login})</span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {user.location ? user.location : 'Location unknown'}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Public repos: {user.public_repos ?? 'N/A'} • Followers: {user.followers ?? 'N/A'}
                </div>
                <div className="mt-2">
                  <a href={user.html_url} target="_blank" rel="noreferrer" className="text-indigo-600">View profile</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {results.length > 0 && results.length < total && (
          <div className="mt-6 text-center">
            <button onClick={loadMore} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Load more</button>
          </div>
        )}

        {(!loading && results.length === 0 && total === 0) && (
          <div className="mt-4 text-sm text-gray-500">No results yet — try a search.</div>
        )}
      </div>
    </div>
  );
}
