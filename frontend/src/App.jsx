import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import LoginPopup from './components/LoginPopup'
import UserDashboard from './pages/UserDashboard'
import Book from './pages/Book'
import axios from 'axios'
import Error from './components/error'
import Services from './pages/Services'
import ProtectedRoute from './components/ProtectedRoute'



const cachedToken = localStorage.getItem("user_token");
if (cachedToken) {
  axios.defaults.headers.common.Authorization = `Bearer ${cachedToken}`
} else {
  delete axios.defaults.headers.common.Authorization
}

const App = () => {

  const [showLogin, setShowLogin] = useState(false);
  
  return (
    <div className='m-0 p-0 '>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}

      <Navbar setShowLogin={setShowLogin} />

      {/* public routes */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/services' element={<Services />} />

        {/* protected routes */}
        <Route element={<ProtectedRoute tokenKey="user_token" redirectTo="/" />}>
          <Route path='/book' element={<Book />} />
          <Route path='/dashboard' element={<UserDashboard />} />
        </Route>
        <Route path='*' element={<Error />} />

      </Routes>
    </div>
  )
}

export default App
