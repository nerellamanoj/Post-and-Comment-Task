import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import PostComponent from './Components/PostComponent';
import PostDetails from './Components/PostList'; // Assuming PostDetails.js was used for details
import Comment from './Components/Comment';
import AddPost from './Components/AddPost';
import Navbar from './Components/Navbar';
import Login from './Components/Login';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navbar />} />
        <Route path='/login' element={<Login />} />
        <Route path='/post' element={<PostComponent />} />
        <Route path='/post/:postId' element={<PostDetails />} />
        <Route path='/post/:postId/comment' element={<Comment />} /> {/* Ensure this route is correctly configured */}
        <Route path='/addpost' element={<AddPost />} />
      </Routes>
    </div>
  );
}

export default App;
