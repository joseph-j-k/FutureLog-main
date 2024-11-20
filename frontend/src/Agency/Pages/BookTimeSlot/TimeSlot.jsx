import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

const TimeSlot = () => {
  const [bookSlot, setBookSlot] = useState("");
  const [bookSlotData, setBookSlotData] = useState(null);

  const handleSubmit = (event, slotId) => {
    event.preventDefault();

    if (!slotId) {
      console.error("Slot ID is undefined");
      return;
    }

    const postData = {
      bookslot: bookSlot,
    };

    axios
      .put(`http://localhost:5000/Slot/${slotId}`, postData)
      .then((response) => {
        console.log("Post request successful:", response.data);
        setBookSlot("");
        fetchBookSlot();
      })
      .catch((error) => {
        console.error("Error sending PUT request:", error);
      });
  };

  const fetchBookSlot = () => {
    axios
      .get("http://localhost:5000/Slot")
      .then((response) => {
        setBookSlotData(response.data.slots);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching slot data:", error);
      });
  };

  useEffect(() => {
    fetchBookSlot();
  }, []);

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
        onSubmit={(event) => handleSubmit(event, bookSlotData[0]?._id)}
      >
        <Box>
          <Stack spacing={2} direction="column" sx={{ m: 2 }}>
            <Typography variant="h4" sx={{ mt: 4 }}>
              Reserve Time Slot
            </Typography>
            <TextField
              id="standard-basic"
              variant="standard"
              type="date"
              value={bookSlot}
              onChange={(event) => setBookSlot(event.target.value)}
            />
            <Button variant="contained" type="submit">
              Reserve Time
            </Button>
          </Stack>
        </Box>
      </Card>
      {bookSlotData && (
        <Paper elevation={3} sx={{ width: "100%", mt: 2 }}>
          <DataGrid
            rows={bookSlotData.map((reserve, index) => ({
              id: index + 1,
              reserveTime: reserve.bookslot,
              _id: reserve._id,
            }))}
            columns={[
              { field: "id", headerName: "Sl No", flex: 1 },
              { field: "reserveTime", headerName: "Reserve Time", flex: 3 },
            ]}
            pageSize={5}
            disableRowSelectionOnClick
          />
        </Paper>
      )}
    </Box>
  );
};

export default TimeSlot;
