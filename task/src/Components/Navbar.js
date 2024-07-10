import React from "react";
import logoImg from "./image.png";
import "./navbar.css"
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
   <nav>
     
      <img src={logoImg} alt="Logo" />
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Services</li>
        <li><button className="login">
            <Link to="/login">
            Login
            </Link>
            
            </button></li>
      </ul>
    
   </nav>
  );
};

export default Navbar;