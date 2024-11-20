
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";

const UserView = () => {
  const [userListData, setUserListData] = useState([]);
  const fetchUserList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/User");
      setUserListData(response.data.users);
    } catch (error) {
      console.error("Error fetching accepted applications:", error);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);
  return (
    <TableContainer
      component={Paper}
      className="table"
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">User ID</TableCell>
            <TableCell className="tableCell">User Img</TableCell>
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">Email Id</TableCell>
            <TableCell className="tableCell">Address</TableCell>
            <TableCell className="tableCell">Phone Number</TableCell>
            <TableCell className="tableCell">Place</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userListData &&
            userListData.map((user, key) => (
              <TableRow key={user.id}>
                <TableCell>{key + 1}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    <img src={user.photo} alt="" className="image" />
                  </div>
                </TableCell>
                <TableCell className="tableCell">
                  {user.username}
                </TableCell>
                <TableCell className="tableCell">
                  {user.useremail}
                </TableCell>
                <TableCell className="tableCell">
                  {user.useraddress}
                </TableCell>
                <TableCell className="tableCell">
                  {user.userphone}
                </TableCell>
                <TableCell className="tableCell">
                  {user.placeId.placename}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserView;
