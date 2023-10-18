// Importing the Axios library
import axios from "axios";

// Creating an Axios instance with custom configuration
export const makeRequest = axios.create({
  // Setting the base URL for API requests
  baseURL: "http://localhost:8800/api/",

  // Enabling sending credentials (such as cookies) with cross-origin requests
  withCredentials: true,
});

//this code exports a pre-configured Axios instance (makeRequest) that can be imported into other modules, allowing consistent and simplified API requests throughout the application. The specified baseURL and withCredentials options ensure that requests are sent to the correct API endpoint and include necessary credentials for authentication.
