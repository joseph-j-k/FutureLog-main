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
import { useState } from "react";
import axios from "axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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

const College = () => {
  const [collegeName, setCollegeName] = useState("");
  const [email, setCollegeEmail] = useState("");
  const [phone, setCollegePhone] = useState("");
  const [password, setCollegePassword] = useState("");
  const [collegeAddress, setCollegeAddress] = useState("");
  const [collegePhoto, setCollegePhoto] = useState(null);
  const [collegeProof, setCollegeProof] = useState(null);
  const [PlaceId, setPlaceId] = useState("");
  const [DistrictId, setDistrictId] = useState("");
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
        console.error("Error fetching places:", error);
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
        console.error("Error fetching districts:", error);
      });
  };

  useEffect(() => {
    fetchDistrict();
  }, []);

  const handlePhotoSelect = (event) => {
    const file = event.target.files[0];
    setCollegePhoto(file);
  };
  const handleProofSelect = (event) => {
    const file = event.target.files[0];
    setCollegeProof(file);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("collegename", collegeName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("address", collegeAddress);
    formData.append("collegePhoto", collegePhoto);
    formData.append("collegeProof", collegeProof);
    formData.append("placeId", PlaceId);

    axios
      .post("http://localhost:5000/College", formData)
      .then((response) => {
        console.log(response.data);
        setCollegeName("");
        setCollegeEmail("");
        setCollegePhone("");
        setCollegePassword("");
        setCollegeAddress("");
        setCollegePhoto(null);
        setCollegeProof(null);
        setPlaceId("");
        setDistrictId("");
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
          backgroundImage: `url('https://images.pexels.com/photos/289738/pexels-photo-289738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
          backgroundSize: 'cover', // or 'contain', depending on your needs
          backgroundPosition: 'center',
          border:'2px solid black'
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
              color: "#333", // Custom color
              textTransform: "uppercase", // Convert text to uppercase
              paddingBottom: "10px", // Add padding to bottom
            }}
          >
            College Registration
          </Typography>
          <Stack spacing={2} direction="column" sx={{ m: 2 }}>
            <TextField
              id="outlined-basic"
              label="College Name"
              variant="outlined"
              onChange={(event) => setCollegeName(event.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={(event) => setCollegeEmail(event.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Phone"
              variant="outlined"
              onChange={(event) => setCollegePhone(event.target.value)}
            />

            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(event) => setCollegePassword(event.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Address"
              multiline
              maxRows={4}
              onChange={(event) => setCollegeAddress(event.target.value)}
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
                <InputLabel id="place-select-label">District</InputLabel>
                <Select
                  labelId="place-select-label"
                  id="place-select"
                  onChange={(event) => {
                    setDistrictId(event.target.value);
                    fetchPlace(event.target.value);
                  }}
                  value={DistrictId}
                >
                  {districtData.map((district, key) => (
                    <MenuItem key={key} value={district._id}>
                      {district.districtname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="place-select-label">Place</InputLabel>
                <Select
                  labelId="place-select-label"
                  id="place-select"
                  value={PlaceId}
                  onChange={(event) => setPlaceId(event.target.value)}
                >
                  {placeData.map((place, key) => (
                    <MenuItem key={key} value={place._id}>
                      {place.placename} ({place.districtId.districtname})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button variant="contained" type="submit">
                Register
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
};
export default College;
