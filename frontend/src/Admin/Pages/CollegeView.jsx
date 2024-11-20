import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";

const CollegeView = () => {
  const [collegeListData, setCollegeListData] = useState([]);
  const fetchCollegeList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/College");
      setCollegeListData(response.data.colleges);
    } catch (error) {
      console.error("Error fetching accepted applications:", error);
    }
  };
  useEffect(() => {
    fetchCollegeList();
  }, []);
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">College ID</TableCell>
            <TableCell className="tableCell">College Img</TableCell>
            <TableCell className="tableCell">College Name</TableCell>
            <TableCell className="tableCell">College Email</TableCell>
            <TableCell className="tableCell">College Phone</TableCell>
            <TableCell className="tableCell">College Address</TableCell>
            <TableCell className="tableCell">College Place</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {collegeListData &&
            collegeListData.map((college, key) => (
              <TableRow key={college.id}>
                <TableCell>{key + 1}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    <img src={college.photo} alt="" className="image" />
                  </div>
                </TableCell>
                <TableCell className="tableCell">
                  {college.collegename}
                </TableCell>
                <TableCell className="tableCell">{college.email}</TableCell>
                <TableCell className="tableCell">{college.phone}</TableCell>
                <TableCell className="tableCell">{college.address}</TableCell>
                <TableCell className="tableCell">
                  {college.placeId.placename}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollegeView;
