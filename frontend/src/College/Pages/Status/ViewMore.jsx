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
  const [displayApplicationData, setDisplayApplication] = useState([]);
  const fetchCourseBooking = () => {
    axios
      .get("http://localhost:5000/CourseBooking")
      .then((response) => {
        setDisplayApplication(response.data.coursebookings);
      })
      .catch((error) => {
        console.error("Error fetching course booking data:", error);
      });
  };

  useEffect(() => {
    fetchCourseBooking();
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
      {displayApplicationData &&
        displayApplicationData.map((courseBook, key) => (
          <Card sx={{ maxWidth: 700, margin: "auto" }}>
            <CardMedia
              component="img"
              alt="No imag"
              height="140"
              src={courseBook.proof}
            />
            <CardContent sx={{ background: "#344955" }}>
              <Typography gutterBottom variant="h3" component="div" sx={{fontWeight:'bolder', fontSize:'60px', fontSmooth:'15px'}}>
                {courseBook.name}
              </Typography>
              <Typography gutterBottom variant="h6" component="div" sx={{color:'grey', fontSize:'14px', fontSmooth:'15px'}}>
                Application ID: {applicationId}
              </Typography>
              <Typography gutterBottom variant="h6" component="div" sx={{color:'grey', fontSize:'14px', fontSmooth:'15px'}}>
                Address:{courseBook.address}
              </Typography>
              <Typography gutterBottom variant="h6" component="div" sx={{color:'grey', fontSize:'14px', fontSmooth:'15px'}}>
                Phone:{courseBook.phone}
              </Typography>
              <Typography gutterBottom variant="h6" component="div" sx={{color:'grey', fontSize:'14px', fontSmooth:'15px'}}>
                Email:{courseBook.email}
              </Typography>
              <Typography gutterBottom variant="h6" component="div" sx={{color:'grey', fontSize:'14px', fontSmooth:'15px'}}>
                Pin:{courseBook.pincode}
              </Typography>
              <Typography gutterBottom variant="h6" component="div" sx={{color:'grey', fontSize:'14px', fontSmooth:'15px'}}>
                GuardianName:{courseBook.guardianName}
              </Typography>
              <Typography gutterBottom variant="h6" component="div" sx={{color:'grey', fontSize:'14px', fontSmooth:'15px'}}>
                GuardianPhone:{courseBook.guardianPhone}
              </Typography>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default ViewMore;
