import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

const Place = () => {
  const [placeName, setPlaceName] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [districtData, setDistrictData] = useState([]);
  const [placeData, setPlaceData] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      placename: placeName,
      districtId,
    }; //usestate and schema name wrapped as object and it assigned to variable data
    axios
      .post("http://localhost:5000/Place", data)
      .then((response) => {
        console.log("post request successful:", response.data);
        setPlaceName("");
        setDistrictId("");
        fetchPlace();
      })
      .catch((error) => {
        console.error("error sending POST request:", error);
      });
  };

  const fetchDistrict = () => {
    axios
      .get(`http://localhost:5000/District`)
      .then((response) => {
        console.log(response.data.districts);
        setDistrictData(response.data.districts); //state update erkm then kollam
      })
      .catch((error) => {
        console.error("Error fetching district data:", error);
      });
  };

  const fetchPlace = () => {
    axios
      .get("http://localhost:5000/Place")
      .then((response) => {
        console.log(response.data.places);
        setPlaceData(response.data.places);
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
      });
  };

  const handleDelete = (Id) => {
    axios
      .delete(`http://localhost:5000/Place/${Id}`)
      .then((response) => {
        console.log("Deleted request Successful", response.data);
        fetchPlace();
      })
      .catch((error) => {
        console.error("Error deleteing course", error);
      });
  };

  useEffect(() => {
    fetchDistrict();
    fetchPlace();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          display: "flex",
          height: 500,
          width: 400,
          justifyContent: "center",
          alignItems: "center",
          px: 5,
        }}
        component={"form"}
        onSubmit={handleSubmit}
      >
        <Box
          sx={{
            display: "flex",
            height: 250,
            width: 400,
            justifyContent: "center",
            px: 5,
          }}
        >
          <Stack spacing={1} direction={"column"} sx={{ m: 4 }}>
            <Typography variant="h3" sx={{ m: 4 }}>
              Place
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">District</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Place"
                // onChange={handleChange}
                onChange={(event) => setDistrictId(event.target.value)}
                value={districtId}
              >
                {/* //view list of districts  */}
                {districtData.map((district, key) => (
                  <MenuItem key={key} value={district._id}>
                    {district.districtname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id="standard-basic"
              label="Place Name"
              variant="standard"
              onChange={(event) => setPlaceName(event.target.value)}
            />
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Stack>
        </Box>
      </Card>
      <TableContainer component={Paper} sx={{ m: 3,overflow: "auto"}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sl No</TableCell>
              <TableCell align="center">District Name</TableCell>
              <TableCell align="right">Place Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {placeData.map((place, key) => (
              <TableRow
                key={key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{key + 1}</TableCell>
                <TableCell component="th" scope="row" align="center">
                {place.districtId.districtname}
                </TableCell>
                <TableCell align="right">{place.placename}</TableCell>
                <TableCell align="right" component="th" scope="row">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(place._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default Place;
