import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import LoginPopup from './components/LoginPopup'
import Book from './pages/Book'


const App = () => {

  const [showLogin, setShowLogin] = useState(false);
  

  return (
    <div className='m-0 p-0 '>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}

      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/book' element={<Book />} />

      </Routes>
    </div>
  )
}

export default App