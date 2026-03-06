import React from 'react'
import AdminBooking from './AdminBooking'

const AdminBookingsList = () => {
  return (
    <div>
         <h2 className='font-semibold text-3xl text-blue-950 mx-8 mb-3.5 mt-7'>New Booking Requests</h2>

        <hr className='mx-8 text-gray-400'/>

        <div>
          <AdminBooking />
          <AdminBooking />
        </div>

    </div>
  )
}

export default AdminBookingsList