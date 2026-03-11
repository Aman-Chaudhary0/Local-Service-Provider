import React, { useEffect, useState } from 'react'
import AdminBooking from './AdminBooking'
import axios from 'axios'

// bookings list of an admin
const AdminBookingsList = () => {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {

    // fetching api
    const fetchBookings = async () => {
      const res = await axios.get("http://localhost:3000/api/get/adminbookings", {
        withCredentials: true
      })

      const bookingsList = res.data.data.map((service) => ({
        userName: service.userId?.username || "Unknown",
        time: service.time,
        date: service.date,
        address: service.address,
      }))

      setBookings(bookingsList);
    }

    fetchBookings();
  }, [])


  return (
    <div>
      <h2 className='font-semibold text-3xl text-blue-950 mx-8 mb-3.5 mt-7'>New Booking Requests</h2>

      <hr className='mx-8 text-gray-400' />

      <div>
        {bookings.map((item, index) => (
          <AdminBooking key={index} userName={item.userName} time={item.time} date={item.date} address={item.address} />
        ))}
      </div>

    </div>
  )
}

export default AdminBookingsList
