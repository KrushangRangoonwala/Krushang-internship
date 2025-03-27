import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar">
      {/* LHS */}
      <div className="nav-left">
        {/* <a href="#">Home</a> */}
        {/* <a href="#">Section</a> */}
        
        {/* <div className="dropdown">
          <button className="dropbtn">Category ▼</button>
          <div className="dropdown-content">
            <a href="#">Category 1</a>
            <a href="#">Category 2</a>
            <a href="#">Category 3</a>
          </div>
        </div> */}
      </div>
      {/* RHS */}
      <div className="nav-right" ref={menuRef}>
        <img
          src="user (1).png"
          alt="Profile"
          className="profile-pic"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        {menuOpen && (
          <div className="menu">
            {/* <a href="#">Change Password</a> */}
            <a href="#">Logout</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;