import React from 'react'
import AdminServicesList from '../components/AdminServicesList'

const AdminDashboard = () => {
  return (
    <div className='bg-blue-50'>
        <div className='bg-cyan-50 flex justify-between'>
            <h2 className=' font-bold text-5xl m-5'>Welcome, John!</h2>
            <p className=' bg-black h-35 w-35 rounded-full m-4'>.</p>
        </div>
        <AdminServicesList />
    </div>
  )
}

export default AdminDashboard