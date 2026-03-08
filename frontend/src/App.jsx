import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import LoginPopup from './components/LoginPopup'
import Book from './pages/Book'
import UserDashboard from './pages/UserDashboard'
import { Navigate } from "react-router-dom";



const App = () => {

  const [showLogin, setShowLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(true)
  

  return (
    <div className='m-0 p-0 '>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}

      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home />} />

        {/* Open book page only when user is login */}
        <Route path="/book" element={<Book />} />
        
        <Route path='/dashboard' element={<UserDashboard />} />

      </Routes>
    </div>
  )
}

export default App