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
  colors,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
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

const Packages = () => {
  const [packageName, setPackageName] = useState("");
  const [packageDetails, setPackageDetails] = useState("");
  const [packagePrice, setPackagePrice] = useState("");
  const [packagePhoto, setPackagePhoto] = useState(null);
  const [packageData, setPackageData] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("packagename", packageName);
    formData.append("details", packageDetails);
    formData.append("price", packagePrice);
    formData.append("photo", packagePhoto);

    axios
      .post("http://localhost:5000/Package", formData)
      .then((response) => {
        console.log(response.data);
        setPackageName("");
        setPackageDetails("");
        setPackagePrice("");
        setPackagePhoto(null);
        fetchPackages();
      })
      .catch((error) => {
        console.error("Error sending POST request:", error);
      });
  };

  const fetchPackages = () => {
    axios
      .get("http://localhost:5000/Package")
      .then((response) => {
        setPackageData(response.data.packages);
        console.log(response.data.packages);
      })
      .catch((error) => {
        console.error("Error Fetching Packages Data:", error);
      });
  };

  const handleDelete = (Id) => {
    axios
      .delete(`http://localhost:5000/Package/${Id}`)
      .then((response) => {
        console.log("Deleted request Successful", response.data);
        fetchPackages();
      })
      .catch((error) => {
        console.error("Error Deleteing Packages", error);
      });
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setPackagePhoto(file);
  };

  const columns = [
    { field: "id", headerName: "Sl No", flex: 1 },
    { field: "packageName", headerName: "Package Name", flex: 2 },
    { field: "packageDetails", headerName: "Package Details", flex: 3 },
    { field: "packagePrice", headerName: "Package Price", flex: 3 },
    {
      field: "packagePhoto",
      headerName: "Package Photo",
      flex: 3,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Package"
          style={{ width: "100%", height: "auto" }}
        />
      ),
    },
    {
      field: "Action",
      headerName: "Actions",
      flex: 2,
      renderCell: (params) => (
        <Button
          variant="outlined"
          colors="error"
          onClick={() => handleDelete(params.row._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "auto",
        backgroundColor: "#282828",
        padding: "20px",
        color: "#FFFFFF",
        border:'3px solid red' 
      }}
    >
      <Card
        sx={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          px: 5,
          my: 4,
          padding: "20px",
          backgroundColor: "#282828",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
        component={"form"}
        onSubmit={handleSubmit}
      >
        <Box>
          <Stack spacing={3} direction={"column"} sx={{ m: 4 }}>
            <Typography
              variant="h3"
              sx={{ m: 2, textAlign: "center", color: "white", fontSize:'65px' }}
            >
              Packages
            </Typography>
            <TextField
              id="standard-basic"
              label="Packages Name"
              variant="standard"
              onChange={(event) => setPackageName(event.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Packages Details"
              variant="standard"
              onChange={(event) => setPackageDetails(event.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Packages Price"
              variant="standard"
              onChange={(event) => setPackagePrice(event.target.value)}
            />
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Package Photo
              <VisuallyHiddenInput type="file" onChange={handleFileSelect} />
            </Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Stack>
        </Box>
      </Card>
      {packageData && (
        <Paper sx={{ width: "100%", my: 2 }}>
          <DataGrid
            rows={packageData.map((packages, index) => ({
              id: index + 1,
              packageName: packages.packagename,
              packageDetails: packages.details,
              packagePrice: packages.price,
              packagePhoto: packages.photo,
              _id: packages._id,
            }))}
            columns={columns}
            pageSize={5}
            autoHeight
            disableRowSelectionOnClick
          />
        </Paper>
      )}
    </Box>
  );
};
export default Packages;
