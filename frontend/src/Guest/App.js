import React from 'react'
import {Route,Routes} from 'react-router-dom'
import User from './Pages/UserRegisteration';
import Login from './Pages/Login';
import College from './Pages/CollegeRegistration';
import Agency from './Pages/AgencyRegistration';
import ChangePassword from './Pages/ChangePassword'


const App = () => {
  return (
    <div>
<Routes>
  <Route path='/College' element={<College/>}/>
  <Route path='/User' element={<User/>}/>
  <Route path='/Agency' element={<Agency/>}/>
  <Route path='/Login' element={<Login/>}/>
  <Route path='/ChangePassword' element={<ChangePassword/>}/>
</Routes>
</div>
  )
}

export default App