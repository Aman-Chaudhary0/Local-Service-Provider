import React from 'react'
import UserBooking from './UserBooking'

const UserBookingsList = () => {
  return (
    <div>
         <h2 className='font-semibold text-3xl text-blue-950 mx-8 mb-3.5 mt-7'>My Bookings</h2>

        <hr className='mx-8 text-gray-400'/>

        <div>
          <UserBooking />
          <UserBooking />

        </div>

    </div>
  )
}

export default UserBookingsList