import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./postdetails.css"
import { useParams } from 'react-router-dom';

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error( error);
      });
  }, [postId]);

  if (!post) {
    return 
  }

  return (
    <div>
      <h2>Post Details</h2>
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <td>{post.id}</td>
          </tr>
          <tr>
            <th>Title</th>
            <td>{post.title}</td>
          </tr>
          <tr>
            <th>Body</th>
            <td>{post.body}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PostDetails;
