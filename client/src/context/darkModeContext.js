import React, { createContext, useEffect, useState } from "react";

// Create a context for managing dark mode state
export const DarkModeContext = createContext();

// DarkModeContextProvider component manages the dark mode state and provides it to the rest of the application
export const DarkModeContextProvider = ({ children }) => {
  // Retrieve dark mode state from localStorage or default to false if not present
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  // Function to toggle dark mode state
  const toggle = () => {
    setDarkMode(!darkMode);
  };

  // Update localStorage whenever dark mode state changes
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Provide dark mode state and toggle function to the components within the provider
  return (
    <DarkModeContext.Provider value={{ darkMode, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// DarkModeContext is created using createContext to manage the dark mode state.
// DarkModeContextProvider component takes children as a prop, which represents the components wrapped by this context provider.
// useState is used to manage the dark mode state, initializing it with the value from localStorage or false if not present.
// The toggle function is defined to toggle the dark mode state between true and false.
// useEffect is utilized to update localStorage whenever the darkMode state changes.
// The DarkModeContext.Provider component is used to provide the dark mode state and toggle function to its children components.
// {children} represents the components wrapped by DarkModeContextProvider, allowing them to access the dark mode state and toggle function through the context.
