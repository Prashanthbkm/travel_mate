import React, { useState, useEffect } from 'react';
import { communityAPI } from '../../api'; 
import '../styles/travelCommunity.css';

const TravelCommunity = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  // Load posts on component mount
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await communityAPI.getAll();
      // Sort by creation date (newest first)
      const sortedPosts = response.data.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPosts(sortedPosts);
    } catch (error) {
      console.error('Error loading posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const addPost = async () => {
    if (!newPost.trim()) return;

    try {
      setPosting(true);
      const postData = {
        content: newPost.trim(),
        author: author.trim() || 'Anonymous',
        createdAt: new Date().toISOString()
      };

      const response = await communityAPI.create(postData);
      setPosts(prev => [response.data, ...prev]);
      setNewPost('');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setPosting(false);
    }
  };

  const deletePost = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await communityAPI.delete(id);
      setPosts(prev => prev.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="travel-community">
        <h2>🌍 Travel Community</h2>
        <div className="loading">Loading community posts...</div>
      </div>
    );
  }

  return (
    <div className="travel-community">
      <h2>🌍 Travel Community</h2>
      
      <div className="post-form">
        <input
          type="text"
          placeholder="Your name (optional)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="author-input"
        />
        <textarea
          placeholder="Share your travel experience..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          rows={4}
        />
        <button onClick={addPost} disabled={posting}>
          {posting ? 'Posting...' : 'Post'}
        </button>
      </div>

      <div className="posts">
        {posts.length === 0 ? (
          <div className="empty-posts">
            <p>No posts yet, be the first to share!</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post">
              <div className="post-header">
                <span className="author">👤 {post.author}</span>
                <span className="date">{formatDate(post.createdAt)}</span>
                <button 
                  onClick={() => deletePost(post.id)}
                  className="delete-post"
                >
                  🗑️
                </button>
              </div>
              <div className="post-content">{post.content}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TravelCommunity;