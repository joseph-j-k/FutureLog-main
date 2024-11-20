import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./GuestStyle.css";
import axios from "axios";

const ChangePassword = () => {
  const Gid = sessionStorage.getItem("gId");
  const [password, setPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [rePassword, setrePassword] = useState("");
  const [currentPassword, setcurrentPassword] = useState("");

  const fetchChangePassword = () => {
    console.log('fdfffgegfeg');
    axios.get(`http://localhost:5000/Agency/${Gid}`).then((response) => {
      console.log(response.data.agency);
      const data = response.data.agency;
      setPassword(data.password);
    });
  };

  const UpdateChangePasswordAgency = () => {
    if (currentPassword === password) {
      if (newPassword === rePassword) {
        const data = {
          password: newPassword,
        };
        axios
          .patch(`http://localhost:5000/updateChangePasswordAgency/${Gid}`, data)
          .then((response) => {
            console.log(response.data);
            fetchChangePassword();
          })
          .catch((error) => {
            console.error("Error updating password:", error);
          });
      } else {
        alert("Re-entered password does not match");
      }
    } else {
      alert("Current password is invalid");
    }
  };
  // useEffect(() => {
  //   fetchChangePassword();
  // }, []);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          p: 5,
          backgroundColor: "aliceblue",
          width: 300,
          height: 350,
          mt: 5,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          textAlign={"center"}
          sx={{ p: 2 }}
          className="dancing-script"
        >
          Change Password
        </Typography>
        <Stack>
          <TextField
            id="standard-basic"
            label="Old Password"
            variant="outlined"
            value={currentPassword}
            onChange={(event) => setcurrentPassword(event.target.value)}
          />
        </Stack>
        <Stack>
          <TextField
            id="standard-basic"
            label="New Password"
            variant="outlined"
            value={newPassword}
            onChange={(event) => setnewPassword(event.target.value)}
          />
        </Stack>
        <Stack>
          <TextField
            id="standard-basic"
            label="Re-Enter New Password"
            variant="outlined"
            value={rePassword}
            onChange={(event) => setrePassword(event.target.value)}
          />
        </Stack>
        <Stack direction="column">
          <Button
            variant="contained"
            fullWidth
            onClick={UpdateChangePasswordAgency}
          >
            Save
          </Button>
        </Stack>
      </Card>
    </Box>
  );
};

export default ChangePassword;
