import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const ViewMore = () => {
  const [applicationId, setApplicationId] = useState("");
  const [displayResonsesData, setDisplayResponsesData] = useState([]);
  const fetchResponses = () => {
    axios
      .get("http://localhost:5000/Request")
      .then((response) => {
        setDisplayResponsesData(response.data.requests);
      })
      .catch((error) => {
        console.error("Error fetching course booking data:", error);
      });
  };

  useEffect(() => {
    fetchResponses();
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
  
  return (
    <div className="fp" style={{ display: "flex", flexWrap: "wrap" }}>
      {displayResonsesData &&
        displayResonsesData.map((display, key) => (
          <Card sx={{ maxWidth: 700, margin: "auto" }}>
            <CardMedia
              component="img"
              alt="No imag"
              height="140"
              src={display.proof}
            />
            <CardContent sx={{ backgroundColor: "#D1E8E2" }}>
              <Typography gutterBottom variant="h3" component="div" sx={{fontWeight:'bolder', fontSize:'60px', fontSmooth:'15px'}}>
                {display.name}
              </Typography>
              <Typography gutterBottom variant="h6" component="div" sx={{color:'grey', fontSize:'14px', fontSmooth:'15px'}}>
                Application ID: {applicationId}
              </Typography>
              <Typography gutterBottom variant="h6" component="div" sx={{color:'grey', fontSize:'14px', fontSmooth:'15px'}}>
                Address:{display.address}
              </Typography>
              <Typography gutterBottom variant="h6" component="div" sx={{color:'grey', fontSize:'14px', fontSmooth:'15px'}}>
                Phone:{display.phone}
              </Typography>
              <Typography gutterBottom variant="h6" component="div" sx={{color:'grey', fontSize:'14px', fontSmooth:'15px'}}>
                Email:{display.email}
              </Typography>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default ViewMore;
