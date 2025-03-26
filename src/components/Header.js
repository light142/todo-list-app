// components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar">
      <h1 className="app-title">Todo List Project</h1>
      <div className="nav-links">
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Header;
