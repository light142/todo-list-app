// Logout.tsx
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from '../context/AuthContext';
import { API_URLS } from "../config"; // Import the base URL from config file
import { useEffect } from "react";
import Spinner from "../components/Spinner"; // Import Spinner component
import './Logout.css'; // Import styles for the logout component

const Logout = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();
    const logout = async () => {
        try {
            const token = localStorage.getItem("token"); // Get token from storage

            if (!token) {
                return;
            }

            const response = await axios.post(
                API_URLS.LOGOUT,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`, // Attach token in the Authorization header
                    },
                }
            );
        } catch (error) {
            console.error("Error logging out:", error);
        } finally {
            // Remove token & redirect
            localStorage.removeItem("token");
            setIsAuthenticated(false);
            navigate("/login"); // Redirect to login page
        }
    };

    // Perform the logout operation when the component mounts
    useEffect(() => {
        logout(); // Perform the logout
    });

    return (
        <div className="logout-container">
            <Spinner />
        </div>
    );
};

export default Logout;
