// Importing necessary modules and components from external files

// Importing authentication-related components
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

// Importing routing-related components from react-router-dom library
import {
  createBrowserRouter, // Function for creating a router
  RouterProvider, // Provider for the router context
  Outlet, // Placeholder for matched child routes
  Navigate, // Component for programmatic navigation
} from "react-router-dom";

// Importing UI components
import Navbar from "./components/navbar/Navbar"; // Navigation bar component
import LeftBar from "./components/leftBar/LeftBar"; // Left sidebar component
// import RightBar from "./components/leftBar/LeftBar";
// Importing pages for different routes
import Home from "./pages/home/Home"; // Home page component
import Profile from "./pages/profile/Profile"; // Profile page component

// Importing styles
import "./style.scss";

// Importing React hooks for context management
import { useContext } from "react";

// Importing custom context providers
import { DarkModeContext } from "./context/darkModeContext"; // Context for managing dark mode
import { AuthContext } from "./context/authContext"; // Context for managing authentication

// Importing data fetching and caching libraries
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Importing the Update component
import Update from "./components/update/Update"; // Update component for user profile updates

// The main component of the application
function App() {
  // Getting the current user status using context from AuthContext
  const { currentUser } = useContext(AuthContext);

  // Getting the dark mode status using context from DarkModeContext
  const { darkMode } = useContext(DarkModeContext);

  // Creating a new instance of QueryClient for API data fetching and caching
  const queryClient = new QueryClient();

  // Layout component defines the overall structure of the application, including Navbar, LeftBar, and main content
  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        {/* Applying dark mode theme dynamically based on darkMode context */}
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          {/* Rendering the Navbar component */}
          <Navbar />
          <div style={{ display: "flex" }}>
            {/* Rendering the LeftBar component */}
            <LeftBar />
            <div style={{ flex: 6 }}>
              {/* Outlet renders the appropriate child component based on the route */}
              <Outlet />
            </div>
            {/* <RightBar /> */}
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  // ProtectedRoute component restricts access to certain routes if there's no authenticated user
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      // If there's no authenticated user, navigate to the login page
      return <Navigate to="/login" />;
    }

    // If there's an authenticated user, render the child components
    return children;
  };

  // Creating routes for different pages using createBrowserRouter from react-router-dom
  const router = createBrowserRouter([
    {
      // Root route "/"
      path: "/",
      // Wrap the Layout component with ProtectedRoute to restrict access
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      // Define child routes for the root route
      children: [
        {
          // Child route for the home page "/"
          path: "/",
          // Render the Home component when this route is accessed
          element: <Home />,
        },
        {
          // Child route for the profile page "/profile/:id"
          path: "/profile/:id",
          // Render the Profile component when this route is accessed
          element: <Profile />,
        },
      ],
    },
    {
      // Route for the login page "/login"
      path: "/login",
      // Render the Login component when this route is accessed
      element: <Login />,
    },
    {
      // Route for the registration page "/register"
      path: "/register",
      // Render the Register component when this route is accessed
      element: <Register />,
    },
    {
      // Route for the update page "/update"
      path: "/update",
      // Render the Update component when this route is accessed
      element: <Update />,
    },
  ]);

  // Render the router inside RouterProvider to enable routing in the application
  return (
    <div>
      {/* Provide the router to the application using RouterProvider */}
      <RouterProvider router={router} />
    </div>
  );
}

// Export the App component as the default export of this module
export default App;

// Context and QueryClient Setup: The code initializes instances of DarkModeContext, AuthContext, and a QueryClient for handling API data fetching and caching.

// Layout Component: The Layout component defines the overall structure of the application. It includes the Navbar, LeftBar, and the main content area. The theme (dark or light) is applied dynamically based on the darkMode context.

// ProtectedRoute Component: The ProtectedRoute component restricts access to certain routes (/ in this case) if there's no authenticated user. If there's no user, the user is redirected to the login page.

// Routes Configuration: Routes are created using the createBrowserRouter function. It defines routes for the root (/), home page, profile page (/profile/:id), login page (/login), registration page (/register), and update page (/update). Each route specifies the corresponding component to render.

// RouterProvider: The router is wrapped inside the RouterProvider component, enabling routing functionality in the application.
