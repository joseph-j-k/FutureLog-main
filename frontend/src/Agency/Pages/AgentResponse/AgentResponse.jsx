import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AgentResponse = () => {
  const [displayResponseData, setDisplayResponse] = useState([]);
  const navigate = useNavigate();
  const fetchResponseApplication = () => {
    axios
      .get("http://localhost:5000/Request")
      .then((response) => {
        setDisplayResponse(response.data.requests);
      })
      .catch((error) => {
        console.error("Error fetching course booking data:", error);
      });
  };

  const handleAction = async (Id, action) => {
    try {
      let response;
      if (action === "accept") {
        response = await axios.put(
          `http://localhost:5000/CourseBooking/${Id}/accept`
        );
        navigate("/Agent/timeSlot");
      } else if (action === "reject") {
        response = await axios.put(
          `http://localhost:5000/CourseBooking/${Id}/reject`
        );
        navigate("/College/Rejected");
      }
      console.log(response.data);
      fetchResponseApplication();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchResponseApplication();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Candidate name", width: 130 },
    { field: "address", headerName: "Address", width: 130 },
    { field: "phone", headerName: "Phone Number", width: 130 },
    {
      field: "viewMore",
      headerName: "View More",
      width: 130,
      renderCell: () => {
        return <a href={`/Agent/ViewMore`}>View More</a>;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      headerAlign: "center",
      renderCell: (params) => (
        <div>
          <Button
            onClick={() => handleAction(params.row.value, "accept")}
            color="primary"
          >
            Reserve Time
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Paper sx={{ width: "100%", mt: 2, backgroundColor: "#D1E8E2" }}>
        <DataGrid
          rows={displayResponseData.map((display, index) => ({
            id: index + 1,
            name: display.name,
            address: display.address,
            phone: display.phone,
            value: display._id,
          }))}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
      </Paper>
    </div>
  );
};

export default AgentResponse;
