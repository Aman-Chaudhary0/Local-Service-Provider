import React, { useEffect, useState } from 'react'
import UserBooking from './UserBooking'
import axios from 'axios'
import { assets } from '../assets/assets'

const UserBookingsList = () => {

  const [bookings, setBookings] = useState([]);
  const [userName, setUserName] = useState('');
  

  // fetch all bookings of a paricular user
  const fetchBookings = async () => {

    const res = await axios.get("http://localhost:3000/api/get/mybookings", {
      withCredentials: true
    })

    setUserName(res.data.user.username);

    const bookingsList = res.data.user.bookedService.map((service) => ({
      adminName: service.adminId.username,
      time: service.time,
      date: service.date,
      address: service.address,
      bookService: service.bookService,
      status: service.status,
    }))

    setBookings(bookingsList);

  }

  useEffect(() => {
    fetchBookings();
  }, []);


  return (
    <div>
      <div className='bg-cyan-50 flex justify-between'>
        <h2 className=' font-bold text-4xl m-5 max-sm:text-3xl'>Welcome Back, {userName}!</h2>
        <img src={assets.profileLogo} className='  h-30 w-30 rounded-full m-4 max-sm:h-25 max-sm:w-25 ' />
      </div>

      <h2 className='font-semibold text-3xl text-blue-950 mx-8 mb-3.5 mt-7'>My Bookings</h2>

      <hr className='mx-8 text-gray-400' />

      <div>
        {bookings.map((item, index) => (
          <UserBooking key={index} adminName={item.adminName} time={item.time} date={item.date} address={item.address} bookService={item.bookService} status={item.status} />
        ))}



      </div>

    </div>
  )
}

export default UserBookingsList
