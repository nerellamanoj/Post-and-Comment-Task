import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./postComponent.css";
import AddPost from "./AddPost"; // Import AddPost component

const PostComponent = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    setIsLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/posts?userId=${loggedInUser.id}`
      )
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [navigate]);

  const handleAddPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // Remove logged-in user data on logout
    alert("Logged out successfully");
    navigate("/");
  };

  return (
    <div>
      <div className="buttons-container">
        <div>
          <button className="button1">
            <Link to="/addpost">ADD POST</Link>
          </button>
        </div>
        <div>
          <button className="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      {isLoading ? (
        <p>Loading posts...</p>
      ) : (
        <table className="posttable">
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
      
      <AddPost onAddPost={handleAddPost} />
    </div>
  );
};

export default PostComponent;
