import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AcceptedList = () => {
  const [acceptedApplicationsData, setAcceptedApplicationsData] = useState([]);

  // Fetch the accepted applications from the server
  const fetchAcceptedApplications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/AcceptedApplications"
      ); // Adjust URL as per your server endpoint
      setAcceptedApplicationsData(response.data.acceptedApplications);
    } catch (error) {
      console.error("Error fetching accepted applications:", error);
    }
  };

  useEffect(() => {
    fetchAcceptedApplications();
  }, []);




  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Candidate name", width: 130 },
    { field: "phone", headerName: "Phone Number", width: 130 },
    { field: "email", headerName: "Email Id", width: 130 },
    { field: "amount", headerName: "Course Fee", width: 130 },
    {
        field: "proof",
        headerName: "Image",
        width: 130,
        renderCell: (params) => (
          <img
            src={params.value} // Assuming 'proof' field contains URL to image
            alt="Proof"
            style={{ width: 100, height: 100 }}
          />
        ),
      },
    { field: "stauts", headerName: "Status", width: 130 },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Paper sx={{ width: "100%", mt: 2, background: "#344955" }}>
        <DataGrid
          rows={acceptedApplicationsData.map((accept, index) => ({
            id: index + 1,
            name: accept.name,
            address: accept.address,
            phone: accept.phone,
            email: accept.email,
            pincode: accept.pincode,
            amount: accept.amount,
            proof: accept.proof,
            stauts: accept.coursebookingstatus,
            value: accept._id,
          }))}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
      </Paper>
    </div>
  );
};

export default AcceptedList;
