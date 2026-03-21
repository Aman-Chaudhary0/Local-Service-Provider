import React, { useEffect, useState } from 'react'
import AdminBooking from './AdminBooking'
import axios from 'axios'
import { getApiData, getApiErrorMessage } from '../utils/api'

// bookings list of an admin
const AdminBookingsList = () => {

  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    // fetching api
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/api/get/adminbookings", {
          withCredentials: true
        })

        // get boking information from server
        const bookingsList = (getApiData(res) || []).map((service) => ({
          bookingId: service._id,
          userName: service.userId?.username || "Unknown",
          time: service.time,
          date: service.date,
          address: service.address,
          status: service.status,
        }))

        setBookings(bookingsList);
        setError("");
      } catch (err) {
        setError(getApiErrorMessage(err, "Failed to load bookings"));
        setBookings([]);

      } finally {
        setIsLoading(false);
      }
    }

    fetchBookings();
  }, [])


  //============================================================================================================================================================//

  return (
    <div>
      <h2 className='font-semibold text-3xl text-blue-950 mx-8 mb-3.5 mt-7'>New Booking Requests</h2>

      <hr className='mx-8 text-gray-400' />

      <div>

        {/* loading ,errr and success status */}
        {isLoading && <p className='mx-8 my-3 rounded bg-blue-100 px-4 py-3 text-blue-700'>Loading booking requests...</p>}
        {error && <p className='mx-8 my-3 text-red-600'>{error}</p>}
        {!isLoading && !error && bookings.length === 0 && <p className='mx-8 my-3 rounded bg-yellow-100 px-4 py-3 text-yellow-800'>No booking requests found.</p>}
        {bookings.map((item, index) => (
          <AdminBooking key={index} bookingId={item.bookingId} userName={item.userName} time={item.time} date={item.date} address={item.address} status={item.status} />
        ))}
      </div>

    </div>
  )
}

export default AdminBookingsList
