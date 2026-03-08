import React, { useState } from 'react'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'

export const App = () => {

   const [showLogin, setShowLogin] = useState(false);
   const token = localStorage.getItem("token");
   
  return (
    <div className=''>
      <Navbar setShowLogin={setShowLogin} />

      <Routes>
        <Route path='/' element={<Register setShowLogin={setShowLogin} />} />
        {token ? <Route path='/admin/dashboard' element={<AdminDashboard />} /> : <></>}
      </Routes>
      
    </div>
  )
}

export default App
