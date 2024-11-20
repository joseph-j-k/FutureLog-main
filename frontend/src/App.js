import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Admin from './Admin/App';
import Guest from './Guest/App';
import User from './User/App';
import Agent from './Agency/App';
import College from './College/App';
import Main from './MainPage/App'





const App = () => {
  return (

      <Routes>
        <Route path='/' element={<Main/>}></Route>
        <Route path='/Admin/*' element={<Admin />}></Route>
        <Route path='/Guest/*' element={<Guest />}></Route>
        <Route path='/User/*' element={<User />}></Route>
        <Route path='/Agent/*' element={<Agent/>}></Route>
        <Route path='/College/*' element={<College/>}></Route>


      </Routes>

  )
}

export default App