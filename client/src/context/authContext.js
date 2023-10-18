import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

// Create a context for managing authentication state
export const AuthContext = createContext();

// AuthContextProvider component takes children as a prop, representing the components wrapped by this context provider.
export const AuthContextProvider = ({ children }) => {
  // Retrieve current user data from localStorage or default to null if not present
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  // useState is used to manage the currentUser state, initializing it with the value from localStorage or null if not present.

  // Function to handle user login
  const login = async (inputs) => {
    try {
      // Send a login request to the server
      const res = await axios.post(
        "http://localhost:8800/api/auth/login",
        inputs,
        {
          withCredentials: true, // Include credentials for cross-origin requests
        }
      );
      setCurrentUser(res.data); // Set current user data based on the response from the server
      console.log(res.data); // Log the response data (for demonstration purposes)
    } catch (error) {
      console.error("Login error:", error); // Handle login error and log the error message
    }
  };

  // Function to handle user logout
  const logout = async () => {
    try {
      // Send a logout request to the server
      await axios.post("http://localhost:8800/api/auth/logout", null, {
        withCredentials: true, // Include credentials for cross-origin requests
      });
      setCurrentUser(null); // Set current user data to null after successful logout
      localStorage.removeItem("user"); // Remove user data from localStorage
    } catch (error) {
      console.error("Logout error:", error); // Handle logout error and log the error message
    }
  };

  // Update localStorage whenever currentUser state changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  // Provide currentUser state, login, and logout functions to the components within the provider
  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}{" "}
      {/* Render the child components wrapped by AuthContextProvider */}
    </AuthContext.Provider>
  );
};

// AuthContext is created using createContext to manage the authentication state.
// The login function sends a login request to the server, updates the currentUser state based on the response, and logs the response data (for demonstration purposes).
// The logout function sends a logout request to the server, sets the currentUser state to null, and removes user data from localStorage.
// useEffect is utilized to update localStorage whenever the currentUser state changes.
// The AuthContext.Provider component provides the currentUser state, login, and logout functions to its children components.
