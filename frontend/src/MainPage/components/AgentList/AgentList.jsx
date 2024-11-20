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

const AgentList = () => {
  const [agentListData, setAgentListData] = useState([]);
  const navigate = useNavigate();
  const fetchAgentList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Agency");
      setAgentListData(response.data.agency);
    } catch (error) {
      console.error("Error fetching accepted applications:", error);
    }
  };

  useEffect(() => {
    fetchAgentList();
  }, []);

  const handleViewClick = () => {
    navigate("/User/PackageList");
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {agentListData &&
        agentListData.map((agent, key) => (
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
                Our Top Agents
              </Typography>
              <CardMedia
                sx={{ height: "150px", width: "100%" }}
                component="img"
                src={agent.photo}
                alt="Your image"
              />
              <Box>
                <CardContent>
                  <Typography variant="h4" color="textPrimary" component="div">
                    {agent.agencyname}
                  </Typography>
                  <Typography color="textPrimary" component="div">
                    {agent.email}
                  </Typography>
                  <Typography color="textPrimary" component="div">
                    {agent.address}
                  </Typography>
                  <Typography color="textPrimary" component="div">
                    {agent.placeId.placename}
                  </Typography>
                </CardContent>
              </Box>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
                  View
                </Button>
              </div>
            </Card>
          </div>
        ))}
    </div>
  );
};

export default AgentList;
