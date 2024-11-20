import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";

const AgentView = () => {
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
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Agency ID</TableCell>
            <TableCell className="tableCell">Agent Img</TableCell>
            <TableCell className="tableCell">Agent Name</TableCell>
            <TableCell className="tableCell">Agent Email</TableCell>
            <TableCell className="tableCell">Agent Address</TableCell>
            <TableCell className="tableCell">Agent Place</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {agentListData &&
            agentListData.map((agent, key) => (
              <TableRow key={agent.id}>
                <TableCell>{key + 1}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    <img src={agent.photo} alt="" className="image" />
                  </div>
                </TableCell>
                <TableCell className="tableCell">{agent.agencyname}</TableCell>
                <TableCell className="tableCell">{agent.email}</TableCell>
                <TableCell className="tableCell">{agent.address}</TableCell>
                <TableCell className="tableCell">
                  {agent.placeId.placename}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AgentView;
