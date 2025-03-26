// components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook

const Header = () => {
  const { isAuthenticated } = useAuth(); // Get authentication state from context

  return (
    <nav className="navbar">
      <h1 className="app-title">Todo List Project</h1>
      <div className="nav-links">
        {isAuthenticated ? (
          <Link to="/logout" className="nav-link">
            Logout
          </Link>
        ) : (
          <>
            <Link to="/register" className="nav-link">
              Register
            </Link>
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
