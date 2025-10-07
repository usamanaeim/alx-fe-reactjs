import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // use JSONPlaceholder to fetch a post
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
      })
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [postId]);

  if (loading) return <p className="p-6">Loading post...</p>;
  if (!post) return <p className="p-6 text-red-600">Post not found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-700">{post.body}</p>
      <p className="mt-4 text-sm text-gray-500">Post ID: {postId}</p>
    </div>
  );
}
