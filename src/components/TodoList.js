// src/components/TodoList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URLS } from "../config"; // Import the base URL from config file
import { Link, useNavigate } from 'react-router';
import Spinner from "../components/Spinner"; // Import Spinner component
import "./TodoList.css";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token"); // Get token from storage
            var response = await axios.get(
                API_URLS.TODOS,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`, // Attach token in the Authorization header
                    },
                }
            );
            if (response?.data) {
                const fetchedTodos = response.data.map((item) => ({
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    status: item.status,
                }));
                setTodos(fetchedTodos);
            }
        } catch (error) {
            console.error("Error fetching todos", error);
        }
        setLoading(false);
    };

    const handleEdit = (id) => {
        navigate(`/edit-todo/${id}`);
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token"); // Get token from storage
            await axios.delete(`${API_URLS.TODOS}${id}/`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`, // Attach token in the Authorization header
                    },
                }
            );
            await fetchTodos();
        } catch (error) {
            console.error("Error deleting todo", error);
        }
        setLoading(false);
    };

    if (loading) return <div className='loading'><Spinner /></div>
    return (
        <>
            <div className="todo-list">
                {todos.map(todo => (
                    <div key={todo.id} className="todo-card">
                        <div className="todo-card-inner">
                            <div className="todo-box">
                                <h2>{todo.title}</h2>
                                <p className={`status ${todo.status.toLowerCase()}`}>{todo.status}</p>
                            </div>
                            <p>{todo.description}</p>
                        </div>
                        <div className="actions">
                            <button className="edit-btn" onClick={() => handleEdit(todo.id)}>Edit</button>
                            <button className="delete-btn" onClick={() => handleDelete(todo.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <Link to="/create-todo">
                <button className="plus-button">+</button>
            </Link>
        </>
    );
};

export default TodoList;
