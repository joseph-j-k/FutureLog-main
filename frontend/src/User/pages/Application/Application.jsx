import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import styled from "@emotion/styled";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Application = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [qualId, setQualId] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPinCode] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [proof, setProof] = useState(null);
  const [placeData, setPlaceData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [qualData, setQualData] = useState([]);
  const [applicationId, setApplicationId] = useState("");

  const fetchPlace = (Id) => {
    axios
      .get(`http://localhost:5000/Place/${Id}`)
      .then((response) => {
        console.log(response.data.places);
        setPlaceData(response.data.places);
      })
      .catch((error) => {
        console.error("Error fetching district data:", error);
      });
  };

  const fetchDistrict = () => {
    axios
      .get(`http://localhost:5000/District`)
      .then((response) => {
        console.log(response.data.districts);
        setDistrictData(response.data.districts);
      })
      .catch((error) => {
        console.error("Error fetching district data:", error);
      });
  };
  const fetchQual = () => {
    axios
      .get(`http://localhost:5000/Qual`)
      .then((response) => {
        console.log(response.data.qualifications);
        setQualData(response.data.qualifications);
      })
      .catch((error) => {
        console.error("Error fetching district data:", error);
      });
  };

  useEffect(() => {
    fetchDistrict();
    fetchQual();
  }, []);


  useEffect(() => {
    const generatedId = generateApplicationId();
    setApplicationId(generatedId);
  }, []);


  const generateApplicationId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000); 
    return `APP-${timestamp}-${random}`;
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setProof(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("phone", phoneNumber);
    formData.append("email", email);
    formData.append("pincode", pin);
    formData.append("guardianName", guardianName);
    formData.append("guardianPhone", guardianPhone);
    formData.append("proof", proof);
    formData.append("placeId", placeId);
    formData.append("qualId", qualId);
  
    axios
      .post(`http://localhost:5000/CourseBooking`, formData)
      .then((response) => {
        console.log(response.data);
        setName("");
        setAddress("");
        setDistrictId("");
        setPlaceId("");
        setPhone("");
        setEmail("");
        setProof("");
        setPinCode("");
        setGuardianName("");
        setGuardianPhone("");
        setQualId("");
        fetchPlace(districtId);
        fetchDistrict();
        fetchQual();
      })
      .catch((error) => {
        console.error("Error sending POST request:", error);
      });
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
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
          sx={{ bgcolor: "#cfe8fc" }}
          component={"form"}
          onSubmit={handleSubmit}
        >
          <Box>
            <Typography variant="h3" sx={{ m: 4 }}>
              Application Form
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Stack spacing={2} direction="column" sx={{ m: 2 }}>
                <TextField
                      id="outlined-multiline-flexible"
                      label="Application Number"
                      multiline
                      maxRows={4}
                      value={applicationId}
                      disabled
                    />
                  <TextField
                    id="outlined-basic"
                    label="Candidate Name"
                    variant="outlined"
                    onChange={(event) => setName(event.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Address"
                    variant="outlined"
                    onChange={(event) => setAddress(event.target.value)}
                  />
                  <Stack spacing={3} direction={"column"} sx={{ m: 4 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        District
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="category"
                        onChange={(event) => {
                          setDistrictId(event.target.value);
                          fetchPlace(event.target.value);
                        }}
                        value={districtId}
                      >
                        {districtData.map((district, key) => (
                          <MenuItem key={key} value={district._id}>
                            {district.districtname}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Place
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="place"
                        onChange={(event) => setPlaceId(event.target.value)}
                        value={placeId}
                      >
                        {placeData.map((place, key) => (
                          <MenuItem key={key} value={place._id}>
                            {place.placename} ({place.districtId.districtname})
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      id="outlined-basic"
                      label="Phone Number"
                      variant="outlined"
                      onChange={(event) => setPhone(event.target.value)}
                    />
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={2} direction="column" sx={{ m: 2 }}>
                  <TextField
                    id="outlined-basic"
                    label="Email Id"
                    variant="outlined"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <TextField
                      id="outlined-basic"
                      label="Pin Code"
                      variant="outlined"
                      onChange={(event) => setPinCode(event.target.value)}
                    />
                  <TextField
                    id="outlined-basic"
                    label="Guardian Name"
                    variant="outlined"
                    onChange={(event) => setGuardianName(event.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Guardian Phone"
                    variant="outlined"
                    onChange={(event) => setGuardianPhone(event.target.value)}
                  />
                  <Stack spacing={3} direction={"column"} sx={{ m: 4 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Qualification
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Qualification"
                        onChange={(event) => {
                          setQualId(event.target.value);
                        }}
                        value={qualId}
                      >
                        {qualData.map((qual, key) => (
                          <MenuItem key={key} value={qual._id}>
                            {qual.qualname}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Button
                      className="Proof"
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload Proof
                      <VisuallyHiddenInput
                        type="file"
                        onChange={handleFileSelect}
                      />
                    </Button>
                    <Button variant="contained" type="submit">
                      Save
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Box>
    </Container>
);
};


export default Application;
