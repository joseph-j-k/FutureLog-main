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

const Course = () => {
  const [courseName, setCourseName] = useState("");
  const [categoryId, setCategoryid] = useState("");
  const [categoryData, setCategoryData] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const postData = {
      coursename: courseName,
      categoryId,
    };
    axios
      .post("http://localhost:5000/Course", postData)
      .then((response) => {
        console.log(response.data);
        setCourseName("");
        setCategoryid("");
        fetchCourse();
        fetchCategory();
      })
      .catch((error) => {
        console.error("Error sending POST request:", error);
      });
  };

  const fetchCategory = () => {
    axios
      .get("http://localhost:5000/Category")
      .then((response) => {
        console.log(response.data.categorys);
        setCategoryData(response.data.categorys);
      })
      .catch((error) => {
        console.error("Error fetching district data:", error);
      });
  };

  const fetchCourse = () => {
    axios
      .get("http://localhost:5000/Course")
      .then((response) => {
        console.log(response.data.courses);
        setCourseData(response.data.courses);
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
      });
  };

  const handleDelete = (Id) => {
    axios
      .delete(`http://localhost:5000/Course/${Id}`)
      .then((response) => {
        console.log("Deleted request Successful", response.data);
        fetchCourse();
      })
      .catch((error) => {
        console.error("Error deleteing course", error);
      });
  };

  useEffect(() => {
    fetchCategory();
    fetchCourse();
  }, []);

  const columns = [
    { field: "id", headerName: "Sl No", flex: 1 },
    { field: "categoryname", headerName: "Category Name", flex: 2 },
    { field: "coursename", headerName: "Course Name", flex: 3 },
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
        height: "500px",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          display: "flex",
          height: 300,
          width: 400,
          justifyContent: "center",
          alignItems: "center",
          px: 5,
        }}
        component={"form"}
        onSubmit={handleSubmit}
      >
        <Box>
          <Stack spacing={3} direction={"column"} sx={{ m: 4 }}>
            <Typography variant="h3" sx={{ m: 5 }}>
              Course
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="category"
                // onChange={handleChange}
                onChange={(event) => setCategoryid(event.target.value)}
                value={categoryId}
              >
                {/* //view list of details */}
                {categoryData &&
                  categoryData.map((category, key) => (
                    <MenuItem key={key} value={category._id}>
                      {category.categoryname}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>{" "}
            <TextField
              id="standard-basic"
              label="Course Name"
              variant="standard"
              onChange={(event) => setCourseName(event.target.value)}
            />
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Stack>
        </Box>
      </Card>
      {courseData && (
        <Paper sx={{ width: "100%", mt: 2 }}>
          <DataGrid
            rows={courseData.map((course, index) => ({
              id: index + 1,
              categoryname: course.categoryId.categoryname,
              coursename: course.coursename,
              _id: course._id,
            }))}
            columns={columns}
            pageSize={5}
            disableRowSelectionOnClick
          />
        </Paper>
      )}
    </Box>
  );
};
export default Course;
