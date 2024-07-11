import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AddPost from './AddPost'; 
import './postComponent.css';

const PostComponent = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddPost, setShowAddPost] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
      navigate('/login');
      return;
    }

    setIsLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/posts?userId=${loggedInUser.id}`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [navigate]);

  const handleAddPost = (newPost) => {
    const nextId = Math.max(...posts.map(post => post.id)) + 1;
    const updatedPost = { ...newPost, id: nextId, userId: JSON.parse(sessionStorage.getItem('loggedInUser')).id };
    setPosts([...posts, updatedPost]);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('loggedInUser'); 
    alert('Logged out successfully');
    navigate('/login');
  };

  return (
    <div>
      <div className="buttons-container">
        <button className="button1" onClick={() => setShowAddPost(!showAddPost)}>
          {showAddPost ? 'CLOSE' : 'ADD POST'}
        </button>
        <button className="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      {isLoading ? (
        <p>Loading posts...</p>
      ) : (
        <table className="post-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </td>
                <td>
                  <Link to={`/post/${post.id}/comment`}>View Comments</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      {showAddPost && <AddPost onAddPost={handleAddPost} />}
    </div>
  );
};

export default PostComponent;
