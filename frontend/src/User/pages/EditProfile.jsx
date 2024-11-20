import React, { useEffect, useState } from "react";
import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";

const Editprofile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [useraddress, setAddress] = useState("");
  const [userphone, setNumber] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState(null);
  const Uid = sessionStorage.getItem("uId");

  const handleFetchSingleUser = () => {
    console.log('hai');
    axios
      .get(`http://localhost:5000/User/${Uid}`)
      .then((response) => {
        const data = response.data.users;
        console.log(data);
        setUserId(data._id);
        setUsername(data.username);
        setEmail(data.useremail);
        setAddress(data.useraddress);
        setNumber(data.userphone);
        setError(); 
      })
      .catch((error) => {
        console.error("Error fetching User data:", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username);
    console.log(email);
    console.log(useraddress);
    console.log(userphone);

    const formData = {
      username: username,
      useremail: email,
      useraddress: useraddress,
      userphone: userphone,
    };

    axios
      .put(`http://localhost:5000/UserEdit/${userId}`, formData)
      .then((response) => {
        console.log("Profile Updated successfully", response);
        setUsername("");
        setEmail("");
        setAddress("");
        setNumber("");
        setUserId("");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        setError("Error updating profile. Please try again."); // Set error state
      });
  };
useEffect(() => {
  handleFetchSingleUser()
},[])

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          display: "flex",
          height: 600,
          width: 700,
          px: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Stack spacing={2} direction="column" sx={{ m: 3 }}>
          <Typography variant="h3" sx={{ m: 4 }}>
            Edit Profile
          </Typography>
          {error && <Typography color="error">{error}</Typography>} {/* Display error message if any */}
          <TextField
            id="username"
            label="User Name"
            variant="outlined"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            id="useraddress"
            label="Address"
            multiline
            rows={4}
            variant="outlined"
            value={useraddress}
            onChange={(event) => setAddress(event.target.value)}
          />
          <TextField
            id="userphone"
            label="Phone"
            type="number"
            variant="outlined"
            value={userphone}
            onChange={(event) => setNumber(event.target.value)}
          />
          <Button variant="contained" type="submit">
            Save
          </Button>
        </Stack>
      </Card>
    </Box>
  );
};

export default Editprofile;
