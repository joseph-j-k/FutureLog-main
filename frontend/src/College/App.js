import Home from "./Pages/home/Home";
import { Routes, Route } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { Card } from "@mui/material";
import Sidebar from './components/sidebar/Sidebar';
import Navbar from './components/navbar/Navbar';
import CollegeCourse from "./Pages/CollegeCourse";
import Qualification from "../Admin/Pages/Qualification";
import UserApplications from "./Pages/UserApplications";
import Status from "./Pages/Status/Status";
import ViewMore from "./Pages/Status/ViewMore";
import AcceptedList from "./Pages/AcceptedList/AcceptedList";
import RejectedList from "./Pages/RejactedList/RejectedList";

const styles = {
  margin: 2,
  height: "75vh",
  overflowY: "scroll", // Allow scrolling
  padding: 3,
  borderRadius: 5,
  // Hide the default scrollbar
  scrollbarWidth: "none",
  "-ms-overflow-style": "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
};

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div>
      <div className="homeMain">
        <Sidebar />
        <div className="homeContainerAdmin">
          <Navbar />
          <Card sx={styles}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/CollegeCourse" element={<CollegeCourse />} />
              <Route path="/Application" element={<UserApplications />} />
              <Route path="/Status" element={<Status />} />
              <Route path="/ViewMore" element={<ViewMore />} />
              <Route path="/Accepted" element={<AcceptedList />} />
              <Route path="/Rejected" element={<RejectedList />} />
            </Routes>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
