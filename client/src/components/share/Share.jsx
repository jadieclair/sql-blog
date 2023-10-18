import React, { useContext, useState } from "react";
import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Share = () => {
  // State for uploaded file and post description
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  // Upload function to handle file upload
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      // Handle upload error
      console.error("Upload error:", err);
      throw new Error("Error uploading file");
    }
  };

  // Get current user from AuthContext
  const { currentUser } = useContext(AuthContext);

  // React Query hook for managing mutations and cache invalidation
  const queryClient = useQueryClient();

  // Mutation for creating a new post
  const mutation = useMutation(
    (newPost) => makeRequest.post("/posts", newPost),
    {
      // Invalidate and refetch posts data after successful post creation
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  // Handle click event when user shares a post
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      let imgUrl = "";
      // If a file is selected, upload it and get the image URL
      if (file) {
        imgUrl = await upload();
      }
      // Mutate to create a new post with description and image URL
      mutation.mutate({ desc, img: imgUrl });
      // Reset description and file states after sharing
      setDesc("");
      setFile(null);
    } catch (error) {
      // Handle errors during post sharing
      console.error("Share post error:", error);
    }
  };

  return (
    <div className="share">
      {/* Share post form */}
      <div className="container">
        {/* Top section with user input */}
        <div className="top">
          <div className="left">
            <img src={"/upload/" + currentUser.profilePic} alt="" />
            {/* Input field for post description */}
            <input
              type="text"
              placeholder={`What's on your mind ${currentUser.name}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {/* Display selected file (image) */}
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        {/* Horizontal divider */}
        <hr />
        {/* Bottom section with file upload and action buttons */}
        <div className="bottom">
          <div className="left">
            {/* Input field for file selection */}
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            {/* Label for file input */}
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            {/* Add Place and Tag Friends buttons */}
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            {/* Share button */}
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
