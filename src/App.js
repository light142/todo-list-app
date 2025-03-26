// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import AuthContext provider
import Register from './components/Register';
import Login from './components/Login';
import Header from './components/Header'; // Import Header component
import './App.css'; // Importing styles

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
