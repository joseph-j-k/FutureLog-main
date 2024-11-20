import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const PackageListView = () => {
  const [packageListData, setPackageListData] = useState([]);
  const navigate = useNavigate();
  const fetchPackageList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Package");
      setPackageListData(response.data.packages);
    } catch (error) {
      console.error("Error fetching accepted applications:", error);
    }
  };

  useEffect(() => {
    fetchPackageList();
  }, []);

  const handleViewClick = () => {
    navigate("/User/AgentList");
  };
  const handleRequestClick = () => {
    navigate("/User/RequestPage");
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {packageListData &&
        packageListData.map((packages, key) => (
          <div key={key} style={{ margin: "10px", flex: "0 0 30%" }}>
            <Card
              sx={{
                width: "100%",
                height: "auto",
                background: "#8B79DD",
                borderRadius: "20px",
              }}
            >
              <Typography
                variant="h5"
                color="textPrimary"
                component="div"
                sx={{ display: "flex", justifyContent: "center" }}
              >
                Our Packages
              </Typography>
              <CardMedia
                sx={{ height: "150px", width: "100%" }}
                component="img"
                src={packages.photo}
                alt="Your image"
              />
              <Box>
                <CardContent>
                  <Typography variant="h4" color="textPrimary" component="div">
                    {packages.packagename}
                  </Typography>
                  <Typography color="textPrimary" component="div">
                    {packages.details}
                  </Typography>
                  <Typography color="textPrimary" component="div">
                    {packages.price}
                  </Typography>
                </CardContent>
              </Box>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0 16px" }}>
                <Button
                  variant="contained"
                  sx={{
                    background: "#8B79DD",
                    borderColor: "white",
                    color: "red",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "black",
                    },
                  }}
                  onClick={handleViewClick}
                >
                  Go Back
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    background: "#8B79DD",
                    borderColor: "white",
                    color: "red",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "black",
                    },
                  }}
                  onClick={handleRequestClick}
                >
                  Request
                </Button>
              </div>
            </Card>
          </div>
        ))}
    </div>
  );
};

export default PackageListView;
