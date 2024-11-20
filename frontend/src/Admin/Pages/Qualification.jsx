import { Box, Button, Card, Paper,FormControl, InputLabel, Select, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';

const Qualification = () => {
  const [qualName, setQualName] = useState("");
  const [qualData, setQualData] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();

    const postData = {
      qualname: qualName,
    };
    axios
      .post("http://localhost:5000/Qual", postData)
      .then((response) => {
        console.log("post request successful:", response.data);
        setQualName("");
        fetchQual();
      })
      .catch((error) => {
        console.error("error sending POST request:", error);
      });
  };

  const fetchQual = () => {
    axios
      .get("http://localhost:5000/Qual")
      .then((response) => {
        setQualData(response.data.qualifications);
        console.log(response.data.qualifications);
      })
      .catch((error) => {
        console.error("Error fetching district data:", error);
      });
  };

  const handleDelete = (Id) => {
    axios
      .delete(`http://localhost:5000/Qual/${Id}`)
      .then((response) => {
        console.log("Delete request Successful", response.data);
        fetchQual();
      })
      .catch((error) => {
        console.error("Error deleting category:", error.response);
      });
  };

  useEffect(() => {
    fetchQual();
  }, []);

  const columns = [
    { field: "id", headerName: "Sl No", flex: 1 },
    { field: "qualname", headerName: "Qualification Name", flex: 3 },
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
              Qualification
            </Typography>
            <TextField
              id="standard-basic"
              label="Qualification"
              variant="standard"
              onChange={(event) => setQualName(event.target.value)}
              value={qualName}
            />
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Stack>
        </Box>
      </Card>
      {qualData &&( <Paper elevation={3} sx={{ width: "100%", mt: 2 }}>
        <DataGrid
          rows={qualData.map((qual, index) => ({
            id: index + 1,
            qualname: qual.qualname,
            _id: qual._id,
          }))}
          columns={columns}
          pageSize={5}
          disableRowSelectionOnClick
        />
      </Paper>)}
    </Box>
  )
}

export default Qualification