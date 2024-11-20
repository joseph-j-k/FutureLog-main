import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './Pages/MainPage'; // Adjust import path

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage/>}></Route>
    </Routes>
  );
}

export default App;