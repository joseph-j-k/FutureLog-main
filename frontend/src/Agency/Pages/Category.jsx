import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

const Category = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryData, setCategoryData] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const postData = {
      categoryname: categoryName,
    };
    axios
      .post("http://localhost:5000/Category", postData)
      .then((response) => {
        console.log("post request successful:", response.data);
        setCategoryName("");
        fetchCategory();
      })
      .catch((error) => {
        console.error("error sending POST request:", error);
      });
  };

  const fetchCategory = () => {
    axios
      .get("http://localhost:5000/Category")
      .then((response) => {
        setCategoryData(response.data.categorys);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching district data:", error);
      });
  };

  const handleDelete = (categoryId) => {
    axios
      .delete(`http://localhost:5000/Category/${categoryId}`)
      .then((response) => {
        console.log("Delete request Successful", response.data);
        fetchCategory();
      })
      .catch((error) => {
        console.error("Error deleting category:", error.response);
      });
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const columns = [
    { field: "id", headerName: "Sl No", flex: 1 },
    { field: "categoryname", headerName: "Streams", flex: 3 },
    {
      field: "Action",
      headerName: "Actions",
      flex: 2,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="error"
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
          height: 205,
          width: 450,
          justifyContent: "center",
          px: 5,
        }}
        component={"form"}
        onSubmit={handleSubmit}
      >
        <Box>
          <Stack spacing={2} direction="column" sx={{ m: 2 }}>
            <Typography variant="h4" sx={{ mt: 4 }}>
              Stream
            </Typography>
            <TextField
              id="standard-basic"
              label="Stream"
              variant="standard"
              value={categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
            />
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Stack>
        </Box>
      </Card>
     {categoryData &&( <Paper elevation={3} sx={{ width: "100%", mt: 2 }}>
        <DataGrid
          rows={categoryData.map((category, index) => ({
            id: index + 1,
            categoryname: category.categoryname,
            _id: category._id,
          }))}
          columns={columns}
          pageSize={5}
          disableRowSelectionOnClick
        />
      </Paper>)}
    </Box>
  );
};
export default Category;
