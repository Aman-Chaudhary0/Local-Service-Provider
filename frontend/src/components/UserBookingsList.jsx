import React, { useEffect, useState } from 'react'
import UserBooking from './UserBooking'
import axios from 'axios'
import { assets } from '../assets/assets'
import { getApiErrorMessage, normalizeApiResponse } from '../utils/api'

const UserBookingsList = () => {

  // state variables
  const [bookings, setBookings] = useState([]);
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // fetch all bookings of a paricular user
  const fetchBookings = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await axios.get("http://localhost:3000/api/get/mybookings", {
        withCredentials: true
      })
      const apiResponse = normalizeApiResponse(res, "Bookings loaded successfully")

       // if api fetch unsuccessfull
      if (!apiResponse.ok) {
        setErrorMessage(apiResponse.message || "Unable to load bookings")
        setBookings([])
        setUserName("")
        return
      }

      const responseData = apiResponse.data

      setUserName(responseData?.username || "");

      // mapping the booking list
      const bookingsList = (responseData?.bookedService || []).map((service) => ({
        adminName: service.adminId?.username || "Unknown Provider",
        time: service.time,
        date: service.date,
        address: service.address,
        bookService: service.bookService,
        status: service.status,
      }))

      setBookings(bookingsList);
      
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "Unable to load bookings"));
      setBookings([]);

    } finally {
      setIsLoading(false);
    }

  }

  useEffect(() => {
    fetchBookings();
  }, []);



//============================================================================================================================================================//
  return (
    <div>
      <div className='flex flex-col gap-4 bg-cyan-50 px-5 py-5 sm:flex-row sm:items-center sm:justify-between'>
        <h2 className='text-3xl font-bold break-words text-slate-900 sm:text-4xl'>Welcome Back, {userName}!</h2>
        <img src={assets.profileLogo} className='h-24 w-24 rounded-full sm:h-28 sm:w-28' />
      </div>

      <h2 className='font-semibold text-3xl text-blue-950 mx-8 mb-3.5 mt-7'>My Bookings</h2>

      <hr className='mx-8 text-gray-400' />

      <div>
        {isLoading && <p className='mx-8 my-4 rounded bg-blue-100 px-4 py-3 text-blue-700'>Loading bookings...</p>}
        {!isLoading && errorMessage && <p className='mx-8 my-4 rounded bg-red-100 px-4 py-3 text-red-700'>{errorMessage}</p>}
        {!isLoading && !errorMessage && bookings.length === 0 && <p className='mx-8 my-4 rounded bg-yellow-100 px-4 py-3 text-yellow-800'>No bookings found.</p>}

        {bookings.map((item, index) => (
          <UserBooking key={index} adminName={item.adminName} time={item.time} date={item.date} address={item.address} bookService={item.bookService} status={item.status} />
        ))}



      </div>

    </div>
  )
}

export default UserBookingsList
