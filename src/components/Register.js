import React, { useState } from "react";
import axios from "axios";
import { API_URLS } from "../config"; // Import the base URL from config file
import Spinner from "../components/Spinner"; // Import Spinner component
import "./Register.css"; // Ensure this file contains your provided CSS styles

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show spinner while processing request
    try {
      const response = await axios.post(API_URLS.REGISTER, formData);
      setSuccessMessage("Registration successful! Please login.");
      setFormData({ username: "", password: "" });
      setErrorMessages([]);
    } catch (error) {
      if (error.response && error.response.data) {
        const errors = error.response.data;
        const errorMessages = Object.values(errors).flat();
        setErrorMessages(errorMessages);
        setSuccessMessage(""); // Clear success message on error
      }
    } finally {
      setLoading(false); // Hide spinner after request is complete
    }
  };

  return (
    <div className="register-container">
      {loading ? (<Spinner />) :
        (
          <div className="register-form">
            <h2 className="title">Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  className="input-field"
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  className="input-field"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                Register
              </button>
            </form>

            {errorMessages.length > 0 && (
              <div className="message">
                {errorMessages.map((message, index) => (
                  <p key={index}>{message}</p>
                ))}
              </div>
            )}

            {successMessage && <div className="message">{successMessage}</div>}
          </div>
        )}
    </div>
  );
}

export default RegisterPage;
