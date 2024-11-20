import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Stack,
  TableCell,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";



const Editprofile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [useraddress, setAddress] = useState("");
  const [userphone, setNumber] = useState("");
  // const [userphoto, setPhoto] = useState(null);
  const [userData, setUserData] = useState([]);
  const [userId, setUserId] = useState(null);

  const fetchUser = () => {
    axios.get("http://localhost:5000/User").then((response) => {
      console.log(response.data.users);
      setUserData(response.data.users);
    }).catch((error) => {
      console.error('Error fetching User data:', error);
    });
  };

  const handleFetchSingleUser = (id) => {
    axios.get(`http://localhost:5000/User/${id}`).then((response) => {
      const data = response.data.users;
      setUserId(data._id);
      setUsername(data.username);
      setEmail(data.email);
      setAddress(data.useraddress);
      setNumber(data.userphone);
    })
    .catch((error) => {
      console.error('Error fetching User data:', error);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username);
    console.log(email);
    console.log(useraddress);
    console.log(userphone);

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("useraddress", useraddress);
    formData.append("userphone", userphone);
    // formData.append("userphoto", userphoto);

    console.log('sdfdsfsdfsd');

    axios.put(`http://localhost:5000/Mon/${userId}`, formData)
        .then((response) => {
        console.log("Profile Updated successfully", response);
        setUsername("");
        setEmail("");
        setAddress("");
        setNumber("");
        fetchUser();
        setUserId(null);
      }).catch((error) => {
        console.error('Error updating profile:', error);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);



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
          {/* <Button
            component="label"
            role="button"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Photo
            <VisuallyHiddenInput
              type="file"
              onChange={handleFileSelect}
              hidden
            />
          </Button> */}
          {userData.map((user) => (
            <React.Fragment key={user._id}>
              <Button
                variant="outlined"
                onClick={() => handleFetchSingleUser(user._id)}
              >
                Edit
              </Button>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </React.Fragment>
          ))}
        </Stack>
      </Card>
    </Box>
  );
};

export default Editprofile;
