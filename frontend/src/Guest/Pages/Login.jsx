import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  TextField,
  Typography,
  Divider,
} from "@mui/material";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const isEmailValid = (email) => {
    // Basic email validation using regular expression
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  const isPasswordValid = (password) => {
    // Basic password validation (e.g., minimum length)
    return password.length >= 6; // Adjust this condition according to your requirements
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate email and password
    if (!isEmailValid(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!isPasswordValid(password)) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    const postData = {
      email,
      password,
    };


    axios
      .post("http://localhost:5000/Login", postData)
      .then((response) => {
        const { id, login } = response.data;
        if (login === "user") {
          sessionStorage.setItem("uId", id);
          navigate("../../User");
        } else if (login === "agency") {
          sessionStorage.setItem("gId", id);
          navigate("../../Agent");
        } else if (login === "college") {
          sessionStorage.setItem("cId", id);
          navigate("../../College");
        } else if (login === "admin") {
          sessionStorage.setItem("aId", id);
          navigate("../../Admin");
        } else {
          setError("Invalid credentials");
        }
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.error("Error sending POST request:", error);
        setError("Login failed. Please check your credentials.");
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 20px",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: 400,
          padding: 4,
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url('https://images.pexels.com/photos/3127880/pexels-photo-3127880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
          backgroundSize: 'cover', // or 'contain', depending on your needs
          backgroundPosition: 'center',
          borderRadius: 10,
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)", // Soft shadow effect
        }}
        component={"form"}
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" sx={{ mb: 4, color: "#333" }}>
          Welcome Back!
        </Typography>
        <Stack spacing={2} direction="column" sx={{ width: "100%" }}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
          <Button
            variant="contained"
            type="submit"
            sx={{
              mt: 2,
              bgcolor: "red",
              color: "#FFF",
              "&:hover": { bgcolor: "#FF6347" },
            }}
          >
            Login
          </Button>
          <Container maxWidth="sm">
            {/* Placeholder for StyledContent */}
            <div>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Don’t have an account?{" "}
                <Link variant="subtitle2" to="/Guest/User">
                  Get started
                </Link>
              </Typography>
              

           
              {/* Placeholder for LoginForm component */}
              {/* <LoginForm /> */}
            </div>
          </Container>
        </Stack>
      </Card>
    </Box>
  );
};

export default Login;
