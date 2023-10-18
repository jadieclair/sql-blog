import React from "react";
import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Posts = ({ userId }) => {
  // Use the "useQuery" hook to fetch posts data based on the provided "userId"
  const { isLoading, error, data } = useQuery(["posts", userId], () => {
    // Make a request to the server to retrieve posts for the specified user
    return makeRequest
      .get("/posts?userId=" + userId)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        // Handle any errors that occur during data retrieval
        console.error("Error fetching posts:", err);
        throw new Error("Error fetching posts");
      });
  });

  return (
    <div className="posts">
      {error
        ? "Something went wrong!"
        : isLoading
        ? "Loading..."
        : // Map through the retrieved posts and render each post component
          data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;

// Error Handling: Error handling has been included within the useQuery hook. If there is an error during data retrieval, it's caught, logged to the console, and a clear error message is thrown. This provides a more informative error handling approach.

// Key for Mapping: When mapping through the retrieved posts and rendering each post component, a unique key is provided for each post to help React efficiently update the component tree.
