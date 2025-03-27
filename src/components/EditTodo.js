import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URLS } from "../config";
import Spinner from "../components/Spinner"; // Import Spinner component

import "./EditTodo.css";

const EditTodo = () => {
    const { id } = useParams(); // Get todo ID from URL
    const navigate = useNavigate();
    const [todo, setTodo] = useState({ title: "", description: "", status: "Pending" });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchTodo();
    });

    const fetchTodo = async () => {
        setLoading(true);
        try {
            console.log(`${API_URLS.TODOS}${id}`);
            const token = localStorage.getItem("token");
            const response = await axios.get(`${API_URLS.TODOS}${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            });
            setTodo({
                title: response.data.title,
                description: response.data.description,
                status: response.data.status,
            });
        } catch (error) {
            console.error("Error fetching todo", error);
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        setTodo({ ...todo, [e.target.name]: e.target.value });
    };

    const handleBack = (e) => {
        navigate('/todos');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const token = localStorage.getItem("token");
            await axios.put(`${API_URLS.TODOS}${id}/`, todo, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            });
            navigate("/todos"); // Redirect back to to-do list
        } catch (error) {
            console.error("Error updating todo", error);
        }
        setSaving(false);
    };

    if (loading) return <div className='loading'><Spinner /></div>

    return (
        <div className="edit-todo-container">
            <h2>Edit To-Do</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" name="title" value={todo.title} onChange={handleChange} required />

                <label>Description:</label>
                <textarea name="description" value={todo.description} onChange={handleChange} required />

                <label>Status:</label>
                <select name="status" value={todo.status} onChange={handleChange}>
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                </select>

                <button type="submit" disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                </button>
                <button onClick={handleBack} className="navigate-button">
                    Back to List
                </button>
            </form>
        </div>
    );
};

export default EditTodo;
