import React, { useState } from 'react';
import axios from 'axios';
import "./addpost.css";

const AddPost = ({ onAddPost }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const newPost = { title, body };
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
      onAddPost(response.data);
      setTitle('');
      setBody('');
    } catch (error) {
      console.error('Error adding post:', error);
      setError('Failed to add post. Please try again.'); 
    } finally {
      setIsLoading(false);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  return (
    <div className='container'>
      <div className='post'>
        <form onSubmit={handleSubmit}>
          <h2>Add Post</h2>
          <div className='title'>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>
          <div>
            <label>Body:</label>
            <textarea
              value={body}
              onChange={handleBodyChange}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button className='button1' type="submit">
            {isLoading ? 'Adding...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
