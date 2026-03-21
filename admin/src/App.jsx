import React, { useState } from 'react'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'
import axios from 'axios'
import ProtectedRoute from './components/ProtectedRoute'
import PublicOnlyRoute from './components/PublicOnlyRoute'
import Error from './components/error'

// seperate token name for user and admin
const cachedToken = localStorage.getItem("admin_token");
if (cachedToken) {
  axios.defaults.headers.common.Authorization = `Bearer ${cachedToken}`
} else {
  delete axios.defaults.headers.common.Authorization
}

export const App = () => {
  //============================================================================================================================================================//
  return (
    <div className=''>
      <Navbar  />

      {/* public routes */}
      <Routes>
        <Route element={<PublicOnlyRoute tokenKey="admin_token" redirectTo="/admin/dashboard" />}>
          <Route path='/' element={<Register />} />
        </Route>

      {/* protected routes */}
        <Route element={<ProtectedRoute tokenKey="admin_token" redirectTo="/" />}>
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
        </Route>

         <Route path='*' element={<Error />} />
      </Routes>
      
    </div>
  )
}

export default App
