import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

const CollegeCourse = () => {
  const [courseId, setCourseId] = useState("");
  const [courseData, setCourseData] = useState([]);

  const Cid = sessionStorage.getItem("cId");

  useEffect(() => {
      fetchCourse();
    
  }, []);

  const fetchCourse = () => {
    axios
      .get(`http://localhost:5000/Course`)
      .then((response) => {
        console.log(response.data.courses);
        setCourseData(response.data.courses);
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const postData = {
      collegeId: Cid,
      courseId: courseId,
    };
    
    axios
      .post(`http://localhost:5000/CollegeCourse/`, postData)
      .then((response) => {
        console.log(response.data);
        setCourseId("");
        fetchCourse();
      })
      .catch((error) => {
        console.error("Error sending POST request:", error);
      });
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            display: "flex",
            height: "50vh",
            width: 500,
            justifyContent: "center",
            alignItems: "center",
            px: 5,
            background: "#344955",
          }}
          component={"form"}
          onSubmit={handleSubmit}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100vh",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack spacing={2} direction="column" sx={{ m: 2 }}>
              <Typography variant="h4" sx={{ m: 4 }}>
                CollegeCourse
              </Typography>
              <Stack spacing={3} direction={"column"} sx={{ m: 4 }}>
               
                <FormControl fullWidth>
                  <InputLabel id="course-select-label">Course</InputLabel>
                  <Select
                    labelId="course-select-label"
                    id="course-select"
                    label="Course"
                    onChange={(event) => setCourseId(event.target.value)}
                    value={courseId}
                  >
                    {courseData.map((course, key) => (
                      <MenuItem key={key} value={course._id}>
                        {course.coursename}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button variant="contained" type="submit">
                  Save
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Card>
      </Box>
    </div>
  );
};

export default CollegeCourse;
