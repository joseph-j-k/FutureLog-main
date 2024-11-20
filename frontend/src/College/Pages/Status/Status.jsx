import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Status = () => {
  const [displayApplicationData, setDisplayApplicationData] = useState([]);
  const navigate = useNavigate();

  const fetchCourseBooking = () => {
    axios
      .get("http://localhost:5000/CourseBooking")
      .then((response) => {
        console.log(response.data.coursebookings);
        setDisplayApplicationData(response.data.coursebookings);
      })
      .catch((error) => {
        console.error("Error fetching course booking data:", error);
      });
  };

  useEffect(() => {
    fetchCourseBooking();
  }, []);

  const handleAction = async (Id, action) => {
    try {
      let response;
      if (action === "accept") {
        response = await axios.put(`http://localhost:5000/CourseBooking/${Id}/accept`);
        navigate("/College/Accepted");
      } else if (action === "reject") {
        response = await axios.put(`http://localhost:5000/CourseBooking/${Id}/reject`);
        navigate("/College/Rejected");
      }
      console.log(response.data);
      fetchCourseBooking();
    } catch (error) {
      console.error(error);
    }
  };

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
        return <a href={`/College/ViewMore`}>View More</a>;
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
            Accept
          </Button>
          <Button
            onClick={() => handleAction(params.row.value, "reject")}
            color="error"
          >
            Reject
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Paper sx={{ width: "100%", mt: 2, background: "#344955" }}>
        <DataGrid
          rows={displayApplicationData.map((display, index) => ({
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

export default Status;
