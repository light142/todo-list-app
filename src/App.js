// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import AuthContext provider
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout'; // Import Logout component
import TodoList from './components/TodoList';
import CreateTodo from './components/CreateTodo';
import EditTodo from './components/EditTodo';
import PrivateRoute from './components/PrivateRoute';
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
            <Route path="/logout" element={<Logout />} />
            <Route path="/todos" element={<PrivateRoute element={TodoList} />} />
            <Route path="/create-todo" element={<PrivateRoute element={CreateTodo} />} />
            <Route path="/edit-todo/:id" element={<PrivateRoute element={EditTodo} />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
