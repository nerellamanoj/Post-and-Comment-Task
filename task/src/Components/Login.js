import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      const users = response.data;
      const user = users.find(
        (u) => u.username === username && u.email === email
      );
      if (username === "" && email === "") {
        alert(" please Fill the Details");
      }
      if (user) {
        sessionStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("Login sussesfully");
        navigate("/post");
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Error logging in");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <br />
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />

          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <button type="submit">Submit</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default Login;
