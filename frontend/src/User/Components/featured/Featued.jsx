import { Box, Button, CardContent, Typography } from "@mui/material";
import "./Featured.css";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Featured = () => {
  const [collegeData, setCollege] = useState([]);
  

  const fetchCollege = () => {
    axios
      .get(`http://localhost:5000/College`)
      .then((response) => {
        console.log(response.data.colleges);
        setCollege(response.data.colleges);
      })
      .catch((error) => {
        console.error("Error fetching district data:", error);
      });
  };

  useEffect(() => {
    fetchCollege();
  }, []);

  return (
    <div className="featured-container">
      {collegeData &&
        collegeData.map((college, key) => (
          <Card key={key} className="featured-card">
            <CardMedia
              component="img"
              image={college.photo}
              alt="College Image"
              className="featured-image"
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {college.collegename}
              </Typography>
            </CardContent>
            <div className="view-button">
              <Link to={`/User/courseView/${college._id}`}>
              <Button
                variant="contained"
                color="primary"
              >
                View
              </Button>
              </Link>
            </div>
          </Card>
        ))}
    </div>
  );
};

export default Featured;
