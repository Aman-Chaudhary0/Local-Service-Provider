import React, { useState } from 'react'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'

export const App = () => {

   const token = localStorage.getItem("admin_token");
   
  return (
    <div className=''>
      <Navbar  />

      <Routes>
        <Route path='/' element={<Register />} />
        {token ? <Route path='/admin/dashboard' element={<AdminDashboard />} /> : <></>}
      </Routes>
      
    </div>
  )
}

export default App
