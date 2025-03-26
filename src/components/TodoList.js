// src/components/TodoList.js
import React from 'react';
import { Link } from 'react-router-dom';
import "./TodoList.css";

const TodoList = () => {
    return (
        <Link to="/create-todo">
            <button className="plus-button">+</button>
        </Link>
    );
};

export default TodoList;
