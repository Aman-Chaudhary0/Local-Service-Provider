import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import LoginPopup from './components/LoginPopup'
import UserDashboard from './pages/UserDashboard'
import { Navigate } from "react-router-dom";
import Book from './pages/Book'
import axios from 'axios'
import Error from './components/error'
import Services from './pages/services'



const cachedToken = localStorage.getItem("user_token");
if (cachedToken) {
  axios.defaults.headers.common.Authorization = `Bearer ${cachedToken}`
} else {
  delete axios.defaults.headers.common.Authorization
}

const App = () => {

  const [showLogin, setShowLogin] = useState(false);
  

  const token = localStorage.getItem("user_token");

  return (
    <div className='m-0 p-0 '>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}

      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home />} />

        {/* Open book page only when user is login */}
        <Route path='/book' element={token ? <Book /> : <Navigate to="/" replace />} />

        <Route path='/services' element={<Services />} />

        <Route path='/dashboard' element={token ? <UserDashboard /> : <Navigate to="/" replace />} />
        <Route path='*' element={<Error />} />

      </Routes>
    </div>
  )
}

export default App
