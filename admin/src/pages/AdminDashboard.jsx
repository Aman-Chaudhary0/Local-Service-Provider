import React from 'react'
import AdminServicesList from '../components/AdminServicesList'
import AdminBookingsList from '../components/AdminBookingsList'
import AddServicePopup from '../components/AddServicePopup'
import { useState } from 'react'
import { assets } from '../assets/assets'

const AdminDashboard = () => {

  // used to display add service form
  const [isServiceAdd, setIsServiceAdd] = useState(true);


  //============================================================================================================================================================//
  return (
    <div className='bg-blue-50'>
        <div className='flex flex-col gap-4 bg-cyan-50 px-5 py-5 sm:flex-row sm:items-center sm:justify-between'>
            <h2 className='text-3xl font-bold text-slate-900 sm:text-4xl'>Welcome, John!</h2>
            <img src={assets.profileLogo} className='h-24 w-24 rounded-full sm:h-28 sm:w-28' />
        </div>
        
        <AddServicePopup isServiceAdd={isServiceAdd} setIsServiceAdd={setIsServiceAdd} />
        <AdminServicesList setIsServiceAdd={setIsServiceAdd} />
        <AdminBookingsList />
    </div>
  )
}

export default AdminDashboard
