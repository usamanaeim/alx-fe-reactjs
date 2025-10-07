// src/App.jsx
import React from 'react'
import PostsComponent from './components/PostsComponent'

export default function App() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">React Query — Posts Demo</h1>
      <PostsComponent />
    </div>
  )
}
