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
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CastForEducationRoundedIcon from "@mui/icons-material/CastForEducationRounded";
import SchoolIcon from '@mui/icons-material/School';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
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
  const toggleDarkMode = () => {
    dispatch({ type: "TOGGLE" });
  };
  return (
    <Card
      className="sidebar"
      sx={{ height: "90vh", margin: 2, padding: 3, borderRadius: 5 }}
    >
      <div
        className="top"
        style={{
          backgroundColor: "#DEF2F1",
          borderRadius: "10px",
          height: "100px",
          width:'210px'
        }}
      >
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <Typography
            variant="h4"
            textAlign={"center"}
            sx={{ p: 2, m: 5 }}
            className="dancing-script"
          >
            Admin Log
          </Typography>
        </Link>
      </div>
      {/* <hr /> */}
      <Box sx={styles}>
        <div className="center">
          <ul>
            <p className="title">MAIN</p>
            <Link to="/admin" style={{ textDecoration: "none" }}>
              <li>
                <DashboardIcon className="icon" />
                <span>Dashboard</span>
              </li>
            </Link>
            <p className="title">LISTS</p>
            <Link to="/admin/category" style={{ textDecoration: "none" }}>
              <li>
                <StreamOutlinedIcon className="icon" />
                <span>Stream</span>
              </li>
            </Link>
            <Link to="/admin/course" style={{ textDecoration: "none" }}>
              <li>
                <CreditCardIcon className="icon" />
                <span>Course</span>
              </li>
            </Link>
            <Link to="/admin/district" style={{ textDecoration: "none" }}>
              <li>
                <AddLocationOutlinedIcon className="icon" />
                <span>District</span>
              </li>
            </Link>

            <Link to="/admin/place" style={{ textDecoration: "none" }}>
              <li>
                <PlaceOutlinedIcon className="icon" />
                <span>Place</span>
              </li>
            </Link>
            <Link to="/admin/qualification" style={{ textDecoration: "none" }}>
              <li>
                <CastForEducationRoundedIcon className="icon" />
                <span>Qualification</span>
              </li>
            </Link>
            <p className="title">USERS</p>
            <Link to="/admin/appplicant" style={{ textDecoration: "none" }}>
              <li>
                <AccountCircleOutlinedIcon className="icon" />
                <span>Applicant</span>
              </li>
            </Link>
            <Link to="/admin/college" style={{ textDecoration: "none" }}>
              <li>
                <SchoolIcon className="icon" />
                <span>College</span>
              </li>
            </Link>
            <Link to="/admin/agent" style={{ textDecoration: "none" }}>
              <li>
                <SupervisedUserCircleIcon className="icon" />
                <span>Agent</span>
              </li>
            </Link>
            
            <p className="title">SERVICE</p>
            <li>
              <InsertChartIcon className="icon" />
              <span>Stats</span>
            </li>
            <li>
              <NotificationsNoneIcon className="icon" />
              <span>Notifications</span>
            </li>
            <li>
              <PsychologyOutlinedIcon className="icon" />
              <span>Logs</span>
            </li>
            <li>
              <SettingsApplicationsIcon className="icon" />
              <span>Settings</span>
            </li>
            <Link to="/admin/Myprofile" style={{ textDecoration: "none" }}>
              <li>
                <AccountCircleOutlinedIcon className="icon" />
                <span>Profile</span>
              </li>
            </Link>
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
