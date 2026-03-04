import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Route, Routes} from 'react-router-dom'
import LoginPopup from './components/LoginPopup'


const App = () => {

const [showLogin, setShowLogin] = useState(false);

  return (
    <div className='m-0 p-0 '>
      {showLogin ?  <LoginPopup setShowLogin={setShowLogin}/> : <></> }
     
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home />} />

      </Routes>
    </div>
  )
}

export default App