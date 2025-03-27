import React from "react";
import { act } from '@testing-library/react'
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import axios from "axios";
import TodoList from "../components/TodoList";
import { API_URLS } from "../config";

// Mock Axios
jest.mock("axios");

describe("TodoList Integration Tests", () => {
    beforeEach(() => {
        localStorage.setItem("token", "mock-token"); // Mock authentication
        jest.clearAllMocks(); // Clear previous mock calls
    });

    test("✅ Renders and fetches todos", async () => {
        axios.get.mockResolvedValueOnce({
            data: [{ id: 1, title: "Test Todo", description: "This is a test", status: "Pending" }],
        });

        await act(async () => {
            render(
                <MemoryRouter>
                    <TodoList />
                </MemoryRouter>
            );
        });

        // Wait for todos to load
        await waitFor(() => expect(screen.getByText("Test Todo")).toBeInTheDocument());
        expect(screen.getByText("This is a test")).toBeInTheDocument();
        expect(screen.getByText("Pending")).toBeInTheDocument();
    });

    test("✅ Deletes a todo and updates the list", async () => {
        axios.get.mockResolvedValueOnce({
            data: [{ id: 1, title: "Test Todo", description: "This is a test", status: "Pending" }],
        });
        axios.delete.mockResolvedValueOnce({});
        axios.get.mockResolvedValueOnce({ data: [] }); // After delete, return an empty list

        await act(async () => {
            render(
                <MemoryRouter>
                    <TodoList />
                </MemoryRouter>
            );
        });

        await waitFor(() => screen.getByText("Test Todo"));

        await act(async () => {
            fireEvent.click(screen.getByText("Delete"));
        });

        await waitFor(() => expect(screen.queryByText("Test Todo")).not.toBeInTheDocument());
    });
});
