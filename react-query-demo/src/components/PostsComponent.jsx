// src/components/PostsComponent.jsx
import React from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const fetchPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  if (!res.ok) {
    throw new Error('Network response was not ok')
  }
  return res.json()
}

export default function PostsComponent() {
  const queryClient = useQueryClient()

  // useQuery: ['posts'] is the cache key
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    // keep results fresh for 5 minutes so navigating away/back reads from cache
    staleTime: 1000 * 60 * 5,
    // keep cache for 10 minutes (optional)
    cacheTime: 1000 * 60 * 10
  })

  if (isLoading) return <p>Loading posts…</p>
  if (isError) return <div>Error: {error.message}</div>

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <button
          onClick={() => refetch()}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Refetch posts
        </button>

        <button
          onClick={() => queryClient.invalidateQueries(['posts'])}
          className="px-3 py-1 border rounded"
        >
          Invalidate cache (forces refetch next time)
        </button>

        <span className="ml-2 text-sm text-gray-600">
          {isFetching ? 'Updating…' : 'Up to date'}
        </span>
      </div>

      <ul className="space-y-3">
        {posts.map((p) => (
          <li key={p.id} className="p-3 border rounded">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-sm text-gray-700">{p.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
