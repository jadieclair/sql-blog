// Importing necessary modules and components from React and the application files
import React from "react";
import ReactDOM from "react-dom/client"; // ReactDOM for rendering React components into the DOM
import App from "./App"; // The main application component
import { AuthContextProvider } from "./context/authContext"; // Context provider for authentication state
import { DarkModeContextProvider } from "./context/darkModeContext"; // Context provider for dark mode state

// Obtaining the root element from the HTML document where the React app will be rendered
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering the application inside context providers for AuthContext and DarkModeContext
root.render(
  // Wrapping the entire application inside a provider for managing dark mode state
  <DarkModeContextProvider>
    {/* Wrapping the application inside a provider for managing authentication state */}
    <AuthContextProvider>
      {/* The main application component */}
      <App />
    </AuthContextProvider>
  </DarkModeContextProvider>
);

// this code sets up the root element for the React application, wraps the main App component inside context providers for managing global states (authentication and dark mode), and renders the application into the DOM. The context providers ensure that any component within the App can access and update these shared states.
