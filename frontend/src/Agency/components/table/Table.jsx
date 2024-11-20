import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";

const List = () => {
  const [agentListData, setAgentListData] = useState([]);
  const fetchAgentList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Agency");
      setAgentListData(response.data.agency);
    } catch (error) {
      console.error("Error fetching accepted applications:", error);
    }
  };

  useEffect(() => {
    fetchAgentList();
  }, []);

  return (
    <TableContainer
      component={Paper}
      className="table"
      sx={{ backgroundColor: "#282828" }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell" sx={{ color: "#8860D0" }}>
              SI ID
            </TableCell>
            <TableCell className="tableCell" sx={{ color: "#8860D0" }}>
              Agent Img
            </TableCell>
            <TableCell className="tableCell" sx={{ color: "#8860D0" }}>
              Agent Name
            </TableCell>
            <TableCell className="tableCell" sx={{ color: "#8860D0" }}>
              Agent Email
            </TableCell>
            <TableCell className="tableCell" sx={{ color: "#8860D0" }}>
              Agent Address
            </TableCell>
            <TableCell className="tableCell" sx={{ color: "#8860D0" }}>
              Agent Place
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {agentListData &&
            agentListData.map((agent, key) => (
              <TableRow key={agent.id}>
                <TableCell sx={{ color: "white" }}>{key + 1}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    <img src={agent.photo} alt="" className="image" />
                  </div>
                </TableCell>
                <TableCell className="tableCell" sx={{ color: "white" }}>
                  {agent.agencyname}
                </TableCell>
                <TableCell className="tableCell" sx={{ color: "white" }}>
                  {agent.email}
                </TableCell>
                <TableCell className="tableCell" sx={{ color: "white" }}>
                  {agent.address}
                </TableCell>
                <TableCell className="tableCell" sx={{ color: "white" }}>
                  {agent.placeId.placename}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
