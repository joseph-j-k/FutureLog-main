import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import AddLocationOutlinedIcon from "@mui/icons-material/AddLocationOutlined";
import StreamOutlinedIcon from "@mui/icons-material/StreamOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PlaylistAddCheckCircleRoundedIcon from "@mui/icons-material/PlaylistAddCheckCircleRounded";
import MilitaryTechRoundedIcon from "@mui/icons-material/MilitaryTechRounded";
import PlaylistAddCheckRoundedIcon from "@mui/icons-material/PlaylistAddCheckRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { Box, Card, Typography } from "@mui/material";

const styles = {
  height: "75vh",
  overflowY: "scroll", // Allow scrolling
  py: 4,

  // Hide the default scrollbar
  scrollbarWidth: "none",
  "-ms-overflow-style": "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
};
const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <Card
      className="sidebar"
      sx={{
        height: "89vh",
        margin: 2,
        padding: 3,
        borderRadius: 5,
        background: "#344955",
        border: "2px solid coral",
      }}
    >
      <div
        className="top"
        style={{
          borderRadius: "350vh",
          height: "120px",
          width: "120px",
          border: "2px solid coral",
        }}
      >
        <Link to="/College" style={{ textDecoration: "none" }}>
          <Typography
            variant="h4"
            textAlign={"center"}
            sx={{ p: 2, m: 5 }}
            className="dancing-script"
          >
            College Log
          </Typography>
        </Link>
      </div>
      {/* <hr /> */}
      <Box sx={styles}>
        <div className="center">
          <ul>
            <p className="title">MAIN</p>
            <Link to="/College" style={{ textDecoration: "none" }}>
              <li>
                <DashboardIcon className="icon" />
                <span>Dashboard</span>
              </li>
            </Link>
            <p className="title">LISTS</p>
            <Link
              to="/College/CollegeCourse"
              style={{ textDecoration: "none" }}
            >
              <li>
                <AddCircleRoundedIcon className="icon" />
                <span>College Course</span>
              </li>
            </Link>
            <Link to="/College/Application" style={{ textDecoration: "none" }}>
              <li>
                <MilitaryTechRoundedIcon className="icon" />
                <span>Applications List</span>
              </li>
            </Link>
            <p className="title">STAUTS</p>
            <li>
              <Link to="/College/Status" style={{ textDecoration: "none" }}>
                <li>
                  <SettingsSystemDaydreamOutlinedIcon className="icon" />
                  <span>Applications</span>
                </li>
              </Link>
            </li>
            <li>
              <Link to="/College/Accepted" style={{ textDecoration: "none" }}>
                <li>
                  <PlaylistAddCheckRoundedIcon className="icon" />
                  <span>Accepted</span>
                </li>
              </Link>
            </li>
            <li>
              <Link to="/College/Rejected" style={{ textDecoration: "none" }}>
                <li>
                  <HighlightOffRoundedIcon className="icon" />
                  <span>Rejected</span>
                </li>
              </Link>
            </li>
            <p className="title">SERVICE</p>
            <li>
              <PsychologyOutlinedIcon className="icon" />
              <span>Logs</span>
            </li>
            <li>
              <SettingsApplicationsIcon className="icon" />
              <span>Settings</span>
            </li>
            <li>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </Box>
    </Card>
  );
};

export default Sidebar;
