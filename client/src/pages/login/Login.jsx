import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  // State for input values and error message
  const [inputs, setInputs] = useState({
    username: "username",
    password: "password",
  });
  const [error, setError] = useState(null);

  // React Router's navigate function
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // Handle input changes
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Attempt to login
      await login(inputs);
      // Redirect to home page on successful login
      navigate("/");
    } catch (error) {
      // Handle login error
      if (error.response) {
        // The request was made and the server responded with a status code
        setError(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an error
        setError("Error processing the request");
      }
    }
  };

  return (
    <div className="login">
      <div className="card">
        {/* Left side content */}
        <div className="left">
          <h1>Friend Hub</h1>
          <p>
            Registering is quick and easy, so don't miss out on the opportunity
            to be a part of this thriving online community. Let your voice be
            heard, and let the conversations begin!
          </p>
          <span>Don't you have an account?</span>
          {/* Link to registration page */}
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        {/* Right side content - login form */}
        <div className="right">
          <h1>Login</h1>
          <form>
            {/* Username input */}
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            {/* Password input */}
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {/* Display error message if there is an error */}
            {error && <div className="error-message">{error}</div>}
            {/* Login button */}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
