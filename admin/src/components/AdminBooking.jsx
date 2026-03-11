import React from 'react'

// admin bookings
const AdminBooking = ({ userName, time, date, address }) => {
  return (
    <div className='bg-white rounded-xl mx-8 my-3 px-6 py-2'>
      <p className='my-2 text-xl font-semibold'>Booking from: {userName}</p>
      <p className='my-2 text-gray-700'>Date: {date} at {time}</p>
      <p className='my-2 text-gray-700'>Address : {address}</p>

      <hr className='text-gray-300 ' />

      <div className='flex justify-around'>
        <button className=' bg-red-500 text-white px-8 py-1.5 my-2.5 rounded-xl text-lg'>Reject</button>
        <button className=' bg-green-800 text-white px-8 py-1.5 my-2.5 rounded-xl text-lg'>Accept</button>
      </div>
    </div>
  )
}

export default AdminBooking