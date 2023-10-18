import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./register.scss";
import axios from "axios";

// The Register component handles user registration
const Register = () => {
  // State variables for form inputs and error messages
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Event handler for input changes
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Event handler for registration button click
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      // Sending a POST request to the server for registration
      await axios.post("http://localhost:8800/api/auth/register", inputs);

      // If registration is successful, update state and display success message
      setRegistrationSuccess(true);
      setError(null);

      // (You can replace this with your own logic for successful registration)
      // Redirect the user to the login page or perform other actions if needed
    } catch (error) {
      // Handling errors using try-catch block
      if (error.response) {
        // The request was made, but the server responded with an error status code
        setError(error.response.data.message);
        setRegistrationSuccess(false);
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response received from the server.");
        setRegistrationSuccess(false);
      } else {
        // Something happened in setting up the request that triggered an error
        setError("Error processing the request.");
        setRegistrationSuccess(false);
      }

      // Throwing the error to be caught by a higher-level error boundary if needed
      throw error;
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Friend Hub</h1>
          <p>
            Welcome back to our vibrant social community! We're thrilled to see
            you again. Enter your credentials and rediscover the joy of sharing
            moments, ideas, and laughter with friends old and new.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            {/* Display error message if registration fails */}
            {error && <div className="error-message">{error}</div>}
            {/* Display success message if registration is successful */}
            {registrationSuccess && (
              <div className="success-message">Registration Successful!</div>
            )}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
