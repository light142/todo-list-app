import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router";
import { AuthProvider } from './context/AuthContext'; // Correct path to AuthContext
import App from "./App";
import axios from "axios";
import { act } from '@testing-library/react'

// Mock Axios
jest.mock("axios");

// Mock AuthContext provider
const mockAuthProvider = (isAuthenticated) => ({
    isAuthenticated,
    setIsAuthenticated: jest.fn(),
});

describe("App Routing & Authentication Tests", () => {
    test("✅ Renders Login page as default route", async () => {
        await act(async () => {
            render(
                <AuthProvider value={mockAuthProvider(false)}>
                    <App />
                </AuthProvider>
            );
        });

        // Test that Login page is rendered as the default route
        expect(screen.getByRole('heading', { name: /login/i, level: 2 })).toBeInTheDocument();
    });

    test("✅ Failed login shows error messages", async () => {
        axios.post.mockRejectedValue({
            response: { data: { error: ["Invalid credentials"] } },
        });

        await act(async () => {
            render(
                <AuthProvider value={mockAuthProvider(false)}>
                    <App />
                </AuthProvider>
            );
        });

        fireEvent.change(screen.getByPlaceholderText(/Username/i), {
            target: { value: "wronguser" },
        });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), {
            target: { value: "wrongpass" },
        });
        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        await waitFor(() => expect(screen.getByText("Invalid credentials")).toBeInTheDocument());
    });

    test("✅ Successful login redirects to /todos", async () => {
        axios.post.mockResolvedValue({ data: { token: "mock-token" } });

        await act(async () => {
            render(
                <AuthProvider value={mockAuthProvider(false)}>
                    <App />
                </AuthProvider>
            );
        });

        fireEvent.change(screen.getByPlaceholderText(/Username/i), {
            target: { value: "testuser" },
        });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), {
            target: { value: "password123" },
        });
        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        await waitFor(() => expect(localStorage.getItem("token")).toBe("mock-token"));
    });

    test("✅ Logout clears token and redirects to login", async () => {
        localStorage.setItem("token", "mock-token");

        await act(async () => {
            render(
                <AuthProvider value={mockAuthProvider(true)}>
                    <App />
                </AuthProvider>
            );
        });

        fireEvent.click(screen.getByText(/Logout/));

        await waitFor(() => expect(localStorage.getItem("token")).toBeNull());
        await new Promise(resolve => setTimeout(resolve, 500));

        expect(screen.getByRole('heading', { name: /login/i, level: 2 })).toBeInTheDocument();
    });
});
