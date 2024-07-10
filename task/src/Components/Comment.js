import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './comments.css';

const Comment = () => {
  const [commentsList, setCommentsList] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { postId } = useParams();

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then(response => {
        setCommentsList(response.data);
      })
      .catch(error => {
        console.error('Error fetching comments: ', error);
      });
  }, [postId]);

  const changeComment = (e) => {
    setNewComment(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      const newCommentObj = {
        body: newComment,
        id: commentsList.length + 1
      };
      setCommentsList([...commentsList, newCommentObj]);
      setNewComment('');
    }
  };

  return (
    <div>
      <h2 className='headpost'>Comments for Post {postId}</h2>
      <form onSubmit={submit}>
        <input
          type="text"
          value={newComment}
          onChange={changeComment}
          placeholder="Enter the comment"
        />
        <button type="submit">Add Comment</button>
      </form>
      {commentsList.map(comment => (
        <div key={comment.id}>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Comment;
