import React, { useState } from 'react'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router'
import AdminDashboard from './pages/AdminDashboard'

export const App = () => {

   const [showLogin, setShowLogin] = useState(false);
   
  return (
    <div className=''>
      <Navbar />

      <Routes>
        <Route path='/' element={<Register setShowLogin={setShowLogin} />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
      </Routes>
      
    </div>
  )
}

export default App
