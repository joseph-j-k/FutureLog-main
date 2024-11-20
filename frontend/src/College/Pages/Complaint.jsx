import React from "react";
import {
  Box,
  Button,
  Card,
 
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";


const Complaint = () => {
 
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");




  const handleSubmit = (event) => {
    event.preventDefault();

    const postData = {
      
      title,
      content,
      userId:sessionStorage.getItem('uId')
     
    };
    
    axios
      .post("http://localhost:5000/complaint", postData)
      .then((response) => {
        console.log(response.data);
        setTitle("");
        setContent("");

      })
      .catch((error) => {
        console.error("Error sending POST request:", error);
      });
  };


  return (
    <Box
      sx={{
        display: "flex",
        height: "120vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          display: "flex",
          height: 1000,
          width: 700,
          px: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
        component={"form"}
        onSubmit={handleSubmit}
      >
        <Box>
          <Typography variant="h3" sx={{ m: 4 }}>
        complaint
          </Typography>
          <Stack spacing={2} direction="column" sx={{ m: 2 }}>
          <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              onChange={(event)=>setTitle(event.target.value)}
            />
            
            <TextField
              id="outlined-multiline-flexible"
              label="feedbackcontent"
              multiline
              maxRows={4}
              onChange={(event) => setContent(event.target.value)}
            />

              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Stack>
        
        </Box>
      </Card>
    </Box>
  );
};
export default Complaint;
