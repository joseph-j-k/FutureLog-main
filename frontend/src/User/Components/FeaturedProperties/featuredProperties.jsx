import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import "./FeaturedProperties.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const FeaturedProperties = ({Id}) => {
  const [collegeCourseData, setCollegeCourse] = useState([]);
  const navigate = useNavigate();
  const handleViewClick = () => {
    navigate("/User/Application");
  };

  const fetchCollegeCourse = () => {
    axios.get(`http://localhost:5000/CollegeCourse/${Id}`).then((response) => {
      console.log(response.data.collegecourses);
      if (Array.isArray(response.data.collegecourses)) {
        setCollegeCourse(response.data.collegecourses);
      } else {
        setCollegeCourse([]);
      }
    });
  };

  useEffect(() => {
    fetchCollegeCourse();
  }, []);
  return (
    <div className="fp" style={{ display: "flex", flexWrap: "wrap" }}>
      {collegeCourseData &&
        collegeCourseData.map((collegcourse, key) => (
          <Card sx={{ maxWidth: 345, margin: "15px" }}>
            <CardMedia
              component="img"
              alt="No image"
              height="140"
              image="https://rgicdn.s3.ap-south-1.amazonaws.com/ghribmjal/images/blogs/guide-to-mca-eligibility-and-admission-process.webp"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {collegcourse.courseId?.coursename}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Bachelor of Computer Applications (BCA): is an undergraduate
                degree program in computer applications. It covers various
                aspects of computer science, including programming, software
                development, database management, and networking.
              </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button size="small" onClick={handleViewClick}>
                Apply
              </Button>
            </CardActions>
          </Card>
        ))}
    </div>
  );
};

export default FeaturedProperties;
