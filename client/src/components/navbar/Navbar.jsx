import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "./navbar.scss";

const Navbar = () => {
  // Accessing context values for dark mode and current user
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // useNavigate replaces useHistory in React Router v6

  // Function to handle logout action
  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext to clear user session
    navigate("/login"); // Redirect to the login page after logout using navigate
  };

  return (
    <div className="navbar">
      {/* Left side of the navbar */}
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Friend Hub</span>
        </Link>

        {/* Toggle dark mode button */}
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}

        {/* Search bar */}
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      {/* Right side of the navbar */}
      <div className="right">
        {/* Logout button */}
        <PersonOutlinedIcon
          onClick={handleLogout}
          style={{ cursor: "pointer" }}
        />

        {/* User information */}
        <div className="user">
          <img src={"/upload/" + currentUser.profilePic} alt="" />

          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// Context Usage: The component uses useContext hook to access the values from DarkModeContext and AuthContext. darkMode variable stores the current state of dark mode, and currentUser contains information about the logged-in user.

// Dark Mode Toggle: The component displays either a sun icon (WbSunnyOutlinedIcon) or a moon icon (DarkModeOutlinedIcon) based on the darkMode state. Clicking on the icon triggers the toggle function, which changes the dark mode state.

// Search Bar: The component includes a search bar with a search icon and an input field for users to enter search queries.

// Logout Functionality: Clicking on the person icon triggers the handleLogout function. This function calls the logout function from the AuthContext to clear the user session and then redirects the user to the login page.

// User Information: The component displays the user's profile picture and name on the right side of the navbar.
