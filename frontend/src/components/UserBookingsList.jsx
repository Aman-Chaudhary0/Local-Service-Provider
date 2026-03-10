import React from 'react'
import UserBooking from './UserBooking'
import axios from 'axios'
import { useState } from 'react'

const UserBookingsList = () => {

  const [bookings, setBookings] = useState([]);

  // fetch all bookings of a paricular user
  const fetchBookings = async () => {

    const res = await axios.get("http://localhost:3000/api/get/mybookings", {
      withCredentials: true
    })

    const bookingsList = res.data.user.bookedService.map((service) => ({
      adminName: service.adminId.username,
      time: service.time,
      date: service.date,
      address: service.address,
      bookService: service.bookService,
    }))

    setBookings(bookingsList);

  }

  fetchBookings();


  return (
    <div>
      <h2 className='font-semibold text-3xl text-blue-950 mx-8 mb-3.5 mt-7'>My Bookings</h2>

      <hr className='mx-8 text-gray-400' />

      <div>
        {bookings.map((item, index) => (
          <UserBooking key={index} adminName={item.adminName} time={item.time} date={item.date} address={item.address} bookService={item.bookService} />
        ))}



      </div>

    </div>
  )
}

export default UserBookingsList