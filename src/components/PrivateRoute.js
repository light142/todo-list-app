import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext"; // Use the AuthContext to check authentication status

const PrivateRoute = ({ element: Element }) => {
  const { isAuthenticated } = useAuth(); // Get authentication status from context
  return isAuthenticated ? <Element /> : <Navigate to="/login" />; // Redirect to login if not authenticated
};

export default PrivateRoute;
