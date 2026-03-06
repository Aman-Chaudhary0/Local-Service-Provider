import React from 'react'
import AdminServicesList from '../components/AdminServicesList'
import AdminBookingsList from '../components/AdminBookingsList'

const AdminDashboard = () => {
  return (
    <div className='bg-blue-50'>
        <div className='bg-cyan-50 flex justify-between'>
            <h2 className=' font-bold text-4xl m-5 max-sm:text-3xl'>Welcome, John!</h2>
            <p className=' bg-black h-30 w-30 rounded-full m-4 max-sm:h-25 max-sm:w-25 '>.</p>
        </div>
        <AdminServicesList />
        <AdminBookingsList />
    </div>
  )
}

export default AdminDashboard