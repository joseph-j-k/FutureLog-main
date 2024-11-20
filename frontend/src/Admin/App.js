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
import Myprofile from "./Pages/Myprofile";
import Adminlogin from "./Pages/adminlogin";
import Sidebar from './components/sidebar/Sidebar';
import Navbar from './components/navbar/Navbar';
import Qualification from "./Pages/Qualification";
import Appplicant from './Pages/UserView'
import College from './Pages/CollegeView'
import Agent from './Pages/AgentView'


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
              <Route path="/Myprofile" element={<Myprofile />} />
              <Route path="/qualification" element={<Qualification />} />
              <Route path="/appplicant" element={<Appplicant />} />
              <Route path="/college" element={<College />} />
              <Route path="/agent" element={<Agent />} />

            </Routes>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
