import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

// admin bookings
const AdminBooking = ({ bookingId, userName, time, date, address, status }) => {

  const [requestStatus, setRequestStatus] = useState(status)
  const [click, setClick] = useState(status !== "Pending")

  // update status of booking request
  const updateStatus = async (nextStatus) => {
    try {
      await axios.post("http://localhost:3000/api/get/requeststatus", {
        _id: bookingId,
        status: nextStatus,
      }, { withCredentials: true })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to update status:", err)
    }
  }

  useEffect(() => {
    setRequestStatus(status)
    setClick(status !== "Pending")
  }, [status])


  // choose colour of status btn
  let color;
  if (requestStatus === "Accepted") {
    color = "bg-green-600"
  } else if (requestStatus === "Rejected") {
    color = "bg-red-600"
  } else {
    color = "bg-yellow-500"
  }

  return (
    <div className='bg-white rounded-xl mx-8 my-3 px-6 py-2'>
      <div className='flex justify-between'>
        <div>
          <p className='my-2 text-xl font-semibold'>Booking from: {userName}</p>
          <p className='my-2 text-gray-700'>Date: {date} at {time}</p>
          <p className='my-2 text-gray-700'>Address : {address}</p>
        </div>
        <p className={`${color} h-8 rounded px-4 text-white my-auto`}>{requestStatus}</p>

      </div>

      <hr className='text-gray-300 ' />

    {/* accept and reject btn  */}
      <div style={{ display: click ? "none" : "flex" }} className='flex justify-around'>
        <button onClick={() => { setRequestStatus("Rejected"); updateStatus("Rejected"); setClick(true) }} className=' bg-red-500 text-white px-8 py-1.5 my-2.5 rounded-xl text-lg'>Reject</button>
        <button onClick={() => { setRequestStatus("Accepted"); updateStatus("Accepted"); setClick(true) }} className=' bg-green-800 text-white px-8 py-1.5 my-2.5 rounded-xl text-lg'>Accept</button>
      </div>
    </div>
  )
}

export default AdminBooking
