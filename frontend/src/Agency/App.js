import Home from "./Pages/home/Home";
import { Routes, Route } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { Card } from "@mui/material";
import Category from "./Pages/Category";
import Course from "./Pages/Course";
import District from "./Pages/District";
import Place from "./Pages/Place";
import MyProfile from "./Pages/Profile/Myprofile";
import Adminlogin from "./Pages/adminlogin";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import Package from "./Pages/Packages";
import Agency from "./Pages/Agency";
import AgentResponse from "./Pages/AgentResponse/AgentResponse";
import ViewMore from "./Pages/ViewMore/ViewMore";
import TimeSlot from "./Pages/BookTimeSlot/TimeSlot";
import ChangePassword from "./Pages/ChangePassword/ChnagePassword";



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
              <Route path="/category" element={<Category />} />
              <Route path="/course" element={<Course />} />
              <Route path="/district" element={<District />} />
              <Route path="/place" element={<Place />} />
              <Route path="/MyProfile" element={<MyProfile />} />
              <Route path="/login" element={<Adminlogin />} />
              <Route path="/agency" element={<Agency />} />
              <Route path="/package" element={<Package />} />
              <Route path="/agentResponse" element={<AgentResponse />} />
              <Route path="/viewMore" element={<ViewMore/>} />
              <Route path="/timeSlot" element={<TimeSlot/>} />
              <Route path="/changePassword" element={<ChangePassword/>} />
              
            </Routes>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
