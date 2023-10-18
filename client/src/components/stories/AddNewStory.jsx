// import { Button, Typography } from "@mui/material";
// import React, { useState } from "react";
// import "./stories.scss";
// import { makeRequest } from "../../axios";

// const AddNewStory = ({ toggle }) => {
//   const [file, setFile] = useState(null);

//   const postNewStory = () => {
//     const img = file;
//     makeRequest.post("/stories", img).then((res) => {
//       return res.data;
//     });
//   };

//   return (
//     <div className="add-story">
//       <input type="file" onChange={(e) => setFile(e.target.files[0])}></input>
//       <Button onClick={postNewStory} size="small">
//         Post
//       </Button>
//       <Button onClick={toggle} size="small">
//         close
//       </Button>
//       <Typography>Hello</Typography>
//     </div>
//   );
// };

// export default AddNewStory;
