import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { TextField, Button } from "@mui/material";
import axios from "axios";

const District = () => {
  const [districtName, setDistrictName] = useState("");
  const [districtData, setDistrictData] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const postData = {
      districtname: districtName,
    };

    axios
      .post("http://localhost:5000/District", postData)
      .then((response) => {
        console.log("POST request successful:", response.data);
        setDistrictName("");
        fetchDistrict();
      })
      .catch((error) => {
        console.error("Error sending POST request:", error);
      });
  };

  const fetchDistrict = () => {
    axios
      .get("http://localhost:5000/District")
      .then((response) => {
        setDistrictData(response.data.districts);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching district data:", error);
      });
  };

  const handleDelete = (Id) => {
    axios
      .delete(`http://localhost:5000/District/${Id}`)
      .then((response) => {
        console.log("Deleted request Successful");
        fetchDistrict();
      })
      .catch((error) => {
        console.error("Error deleteing course", error);
      });
  };

  useEffect(() => {
    fetchDistrict();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Card
        sx={{
          width: 400,
          height: 250,
          display: "flex",
          justifyContent: "center",
          px: 5,
        }}
        component={"form"}
        onSubmit={handleSubmit}
      >
        <Box>
          <Typography variant="h4" sx={{ m: 4 }}>
            District
          </Typography>
          <Stack spacing={2} direction="row" sx={{ m: 2 }}>
            <TextField
              id="standard-basic"
              label="District"
              variant="standard"
              value={districtName}
              onChange={(event) => setDistrictName(event.target.value)}
            />
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Stack>
        </Box>
      </Card>
      <TableContainer component={Paper} sx={{ m: 4, overflow: "auto" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sl No</TableCell>
              <TableCell>Districts</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {districtData.map((district, key) => (
              <TableRow
                key={key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{key + 1}</TableCell>
                <TableCell component="th" scope="row">
                  {district.districtname}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(district._id)}
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

export default District;
