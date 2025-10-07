// src/App.jsx
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PostsComponent from './components/PostsComponent'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">React Query — Posts Demo</h1>
        <PostsComponent />
      </div>
    </QueryClientProvider>
  )
}
