import React, { useState } from 'react';
import '../styles/travelCommunity.css';

const TravelCommunity = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  const addPost = () => {
    if (!newPost.trim()) return;
    setPosts([{ content: newPost, id: Date.now() }, ...posts]);
    setNewPost('');
  };

  return (
    <div className="travel-community">
      <h2>🌍 Travel Community</h2>
      <textarea
        placeholder="Share your travel experience..."
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        rows={4}
      />
      <button onClick={addPost}>Post</button>
      <div className="posts">
        {posts.length === 0 && <p>No posts yet, be the first to share!</p>}
        {posts.map((post) => (
          <div key={post.id} className="post">
            {post.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelCommunity;
