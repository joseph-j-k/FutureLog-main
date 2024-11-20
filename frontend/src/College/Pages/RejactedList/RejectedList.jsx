import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RejectedList = () => {
  const [rejectedApplicationsData, setRejectedApplicationsData] = useState([]);

  // Fetch the accepted applications from the server
  const fetchRejectedApplications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/RejectedApplications"
      ); // Adjust URL as per your server endpoint
      setRejectedApplicationsData(response.data.rejectedApplications);
    } catch (error) {
      console.error("Error fetching accepted applications:", error);
    }
  };

  useEffect(() => {
    fetchRejectedApplications();
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
    { field: "status", headerName: "Status", width: 130 },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Paper sx={{ width: "100%", mt: 2, background: "#344955" }}>
        <DataGrid
          rows={rejectedApplicationsData.map((reject, index) => ({
            id: index + 1,
            name: reject.name,
            address: reject.address,
            phone: reject.phone,
            email: reject.email,
            pincode: reject.pincode,
            amount: reject.amount,
            proof: reject.proof,
            status: reject.coursebookingstatus,
            value: reject._id,
          }))}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
      </Paper>
    </div>
  );
};

export default RejectedList;
