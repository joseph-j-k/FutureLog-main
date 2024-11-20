import Home from "../../Admin/Pages/home/Home";
import {  Routes, Route } from "react-router-dom";
import "../../Admin/style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "../../Admin/context/darkModeContext";


import Requestpage from '../Requestpage';
import Packageschema from '../Packageschema';
import Agency from '../Agency';


import { Card } from "@mui/material";

// const styles = {
//   margin: 2,
//   height: '75vh',
//   overflowY: 'scroll', // Allow scrolling
//   padding: 3,
//   borderRadius: 5,
//   // Hide the default scrollbar
//   scrollbarWidth: 'none',
//   '-ms-overflow-style': 'none',
//   '&::-webkit-scrollbar': {
//     display: 'none',
//   },
// };

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
     <div>
          <Card >

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/agency" element={<Agency/>}/>
            <Route path="/packageschema" element={<Packageschema/>}/>
            <Route path="/requestpage" element={<Requestpage/>}/>
      


          </Routes>
          </Card>
        </div>
      </div>
 
  );
}

export default App;