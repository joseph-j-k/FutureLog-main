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

const RequestPage = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [proof, setProof] = useState("");
  const [packageId, setPackageId] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [qualId, setQualId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [placeData, setPlaceData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [packageData, setPackageData] = useState([]);
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

  const fetchPackages = () => {
    axios
      .get(`http://localhost:5000/Package`)
      .then((response) => {
        console.log(response.data.packages);
        setPackageData(response.data.packages);
      })
      .catch((error) => {
        console.error("Error fetching district data:", error);
      });
  };

  useEffect(() => {
    fetchDistrict();
    fetchQual();
    fetchPackages();
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
    formData.append("description", description);
    formData.append("proof", proof);
    formData.append("packageId", packageId);
    formData.append("placeId", placeId);
    formData.append("qualId", qualId);

    axios
      .post(`http://localhost:5000/Request`, formData)
      .then((response) => {
        console.log(response.data);
        console.log("dfsdfds");
        setName("");
        setAddress("");
        setPhoneNumber("");
        setEmail("");
        setDescription("");
        setProof("");
        setPackageId("");
        setPlaceId("");
        setQualId("");
        setDistrictId("");
        fetchPlace(districtId);
        fetchDistrict();
        fetchQual();
        fetchPackages();
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
              Request Form
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
                      onChange={(event) => setPhoneNumber(event.target.value)}
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
                    id="outlined-multiline-flexible"
                    label="Description"
                    multiline
                    maxRows={4}
                    onChange={(event) => setDescription(event.target.value)}
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
                    <Stack spacing={3} direction={"column"} sx={{ m: 4 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Package
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Course Booking"
                          onChange={(event) => {
                            setPackageId(event.target.value);
                          }}
                          value={packageId}
                        >
                          {packageData.map((packages, key) => (
                            <MenuItem key={key} value={packages._id}>
                              {packages.packagename}
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
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default RequestPage;
