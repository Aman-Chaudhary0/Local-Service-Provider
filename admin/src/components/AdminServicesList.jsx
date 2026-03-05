import React from 'react'
import AdminService from './AdminService'


// services offered by provider
const AdminServices = () => {
  return (
    <div className=' my-10 bg-indigo-50'>

        <h2 className='font-semibold text-3xl text-blue-950 mx-8 mb-3.5 mt-7'>Manage My Services</h2>

        <hr className='mx-8 text-gray-400'/>

        <div className='rounded-xl mx-8 my-4 bg-white'>
          <AdminService />
          <AdminService />
          <AdminService />
          <AdminService />
        </div>

        <button className='bg-blue-600 text-white mx-8 my-4 w-1/4 py-3.5 rounded text-xl'>Add New Service</button>

      
    </div>
  )
}

export default AdminServices