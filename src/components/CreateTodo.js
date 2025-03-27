import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router'; // Use 'useNavigate' from react-router-dom v6
import { API_URLS } from "../config"; // Import the base URL from config file
import './CreateTodo.css'; // Import custom styles for CreateTodo

const CreateTodo = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('PENDING');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const todoData = { title, description, status };
        const token = localStorage.getItem("token"); // Get token from storage

        try {
            await axios.post(
                API_URLS.TODOS,
                todoData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`, // Attach token in the Authorization header
                    },
                }
            );
            setLoading(false);
            navigate('/todos'); // Redirect to Todo List after successful creation
        } catch (err) {
            setLoading(false);
            setError('Failed to create Todo');
        }
    };

    const handleBack = (e) => {
        navigate('/todos');
    }

    return (
        <div className="create-todo-container">
            <h1>Create Todo</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter Todo Title"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter Todo Description"
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <option value="PENDING">Pending</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Todo'}
                </button>
                <button onClick={handleBack} className="navigate-button">
                    Back to List
                </button>
            </form>
        </div>
    );
};

export default CreateTodo;
