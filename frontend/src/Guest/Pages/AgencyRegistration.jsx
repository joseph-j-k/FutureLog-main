import React, { useEffect } from "react";
import {
  Box,
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
import styled from "@emotion/styled";
import { useState } from "react";
import axios from "axios";

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

const Agency = () => {
  const [agencyName, setAgencyName] = useState("");
  const [email, setAgencyEmail] = useState("");
  const [phone, setAgencyPhone] = useState("");
  const [password, setAgencyPassword] = useState("");
  const [agencyAddress, setAgencyAddress] = useState("");
  const [agencyPhoto, setAgencyPhoto] = useState(null);
  const [agencyProof, setAgencyProof] = useState(null);
  const [agencyPlaceId, setAgencyPlaceId] = useState("");
  const [agencyDistrictId, setAgencyDistrictId] = useState("");
  const [placeData, setPlaceData] = useState([]);
  const [districtData, setDistrictData] = useState([]);

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
      .get("http://localhost:5000/District")
      .then((response) => {
        console.log(response.data.districts);
        setDistrictData(response.data.districts);
      })
      .catch((error) => {
        console.error("Error fetching district data:", error);
      });
  };

  useEffect(() => {
    fetchDistrict();
  }, []);

  const handlePhotoSelect = (event) => {
    const file = event.target.files[0];
    setAgencyPhoto(file);
  };

  const handleProofSelect = (event) => {
    const file = event.target.files[0];
    setAgencyProof(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // const postData = {
    //   agencyname: agencyName,
    //   email: email,
    //   phone: phone,
    //   password: password,
    //   address: agencyAddress,
    //   photo: agencyPhoto,
    //   proof: agencyProof,
    //   placeId: agencyPlaceId,
    //   districtId: agencyDistrictId,
    // };

    const formData = new FormData();
    formData.append("agencyname", agencyName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("address", agencyAddress);
    formData.append("agentPhoto", agencyPhoto);
    formData.append("agentProof", agencyProof);
    formData.append("placeId", agencyPlaceId);
    axios
      .post("http://localhost:5000/Agency", formData)
      .then((response) => {
        console.log(response.data);
        setAgencyName("");
        setAgencyEmail("");
        setAgencyPhone("");
        setAgencyPassword("");
        setAgencyAddress("");
        setAgencyPhoto(null);
        setAgencyProof(null);
        setAgencyPlaceId("");
        setAgencyDistrictId("");
        fetchPlace(agencyDistrictId);
        fetchDistrict();
      })
      .catch((error) => {
        console.error("Error sending POST request:", error);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "auto",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          maxWidth: 600,
          padding: 4,
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Add box shadow
          backgroundImage: `url('https://images.pexels.com/photos/5632360/pexels-photo-5632360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
          backgroundSize: 'cover', // or 'contain', depending on your needs
          backgroundPosition: 'center',
          border:'2px solid black',
          color: "white",
        }}
        component={"form"}
        onSubmit={handleSubmit}
      >
        <Box>
          <Typography
            variant="h3"
            sx={{
              marginTop: "0px ",
              textAlign: "center",
              color: "white", // Custom color
              textTransform: "uppercase", // Convert text to uppercase
              paddingBottom: "10px", // Add padding to bottom
            }}
          >
            Agency Registration
          </Typography>
          <Stack spacing={2} direction="column" sx={{ m: 2 }}>
            <TextField
              id="outlined-basic"
              label="Agency Name"
              variant="outlined"
              onChange={(event) => setAgencyName(event.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={(event) => setAgencyEmail(event.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Phone"
              variant="outlined"
              onChange={(event) => setAgencyPhone(event.target.value)}
            />

            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(event) => setAgencyPassword(event.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Address"
              multiline
              maxRows={4}
              onChange={(event) => setAgencyAddress(event.target.value)}
            />
            <Button
              className="Photo"
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload Photo
              <VisuallyHiddenInput type="file" onChange={handlePhotoSelect} />
            </Button>
            <Button
              className="Proof"
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload Proof
              <VisuallyHiddenInput type="file" onChange={handleProofSelect} />
            </Button>
            <Stack spacing={3} direction={"column"} sx={{ m: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">District</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="category"
                  // onChange={handleChange}
                  onChange={(event) => {
                    setAgencyDistrictId(event.target.value);
                    fetchPlace(event.target.value);
                  }}
                  value={agencyDistrictId}
                >
                  {/* //view list of details */}
                  {districtData.map((district, key) => (
                    <MenuItem key={key} value={district._id}>
                      {district.districtname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Place</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="place"
                  // onChange={handleChange}
                  onChange={(event) => setAgencyPlaceId(event.target.value)}
                  value={agencyPlaceId}
                >
                  {/* //view list of details */}
                  {placeData.map((place, key) => (
                    <MenuItem key={key} value={place._id}>
                      {place.placename} ({place.districtId.districtname})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
};
export default Agency;
