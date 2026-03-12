import React from 'react'
import AdminServicesList from '../components/AdminServicesList'
import AdminBookingsList from '../components/AdminBookingsList'
import AddServicePopup from '../components/AddServicePopup'
import { useState } from 'react'
import { assets } from '../assets/assets'

const AdminDashboard = () => {

  // used to display add service form
  const [isServiceAdd, setIsServiceAdd] = useState(true);

  return (
    <div className='bg-blue-50'>
        <div className='bg-cyan-50 flex justify-between'>
            <h2 className=' font-bold text-4xl m-5 max-sm:text-3xl'>Welcome, John!</h2>
            <img src={assets.profileLogo} className=' h-30 w-30 rounded-full m-4 max-sm:h-25 max-sm:w-25 ' />
        </div>
        
        <AddServicePopup isServiceAdd={isServiceAdd} setIsServiceAdd={setIsServiceAdd} />
        <AdminServicesList setIsServiceAdd={setIsServiceAdd} />
        <AdminBookingsList />
    </div>
  )
}

export default AdminDashboard