import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

// admin bookings
const AdminBooking = ({ bookingId, userName, time, date, address, status }) => {


  // state variables
  const [requestStatus, setRequestStatus] = useState(status)
  const [click, setClick] = useState(status !== "Pending")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  // update status of booking request
  const updateStatus = async (nextStatus) => {
    try {
      setIsLoading(true)
      setErrorMessage("")
      setSuccessMessage("")

      //api fetching
      await axios.post("http://localhost:3000/api/get/requeststatus", {
        _id: bookingId,
        status: nextStatus,
      }, { withCredentials: true })


      setSuccessMessage(`Request ${nextStatus.toLowerCase()} successfully`)
      setClick(true)
      setRequestStatus(nextStatus)

    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Failed to update status")
      setRequestStatus(status)
      setClick(false)

    } finally {
      setIsLoading(false)
    }
  }

  // action after api calling
  useEffect(() => {
    setRequestStatus(status)
    setClick(status !== "Pending")
    setErrorMessage("")
    setSuccessMessage("")
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


  //============================================================================================================================================================//
  return (
    <div className='bg-white rounded-xl mx-8 my-3 px-6 py-2'>

      {/* booking info */}
      <div className='flex justify-between'>
        <div>
          <p className='my-2 text-xl font-semibold'>Booking from: {userName}</p>
          <p className='my-2 text-gray-700'>Date: {date} at {time}</p>
          <p className='my-2 text-gray-700'>Address : {address}</p>
        </div>

        {/* current status */}
        <p className={`${color} h-8 rounded px-4 text-white my-auto`}>{requestStatus}</p>

      </div>

      <hr className='text-gray-300 ' />

      {/* error, success and loading state  */}
      {errorMessage && <p className='my-2 rounded bg-red-100 px-3 py-2 text-sm text-red-700'>{errorMessage}</p>}
      {successMessage && <p className='my-2 rounded bg-green-100 px-3 py-2 text-sm text-green-700'>{successMessage}</p>}
      {isLoading && <p className='my-2 rounded bg-blue-100 px-3 py-2 text-sm text-blue-700'>Updating request...</p>}

      {/* accept and reject btn  */}
      <div style={{ display: click ? "none" : "flex" }} className='flex justify-around'>
        <button disabled={isLoading} onClick={() => { setRequestStatus("Rejected"); updateStatus("Rejected"); }} className=' bg-red-500 text-white px-8 py-1.5 my-2.5 rounded-xl text-lg disabled:bg-red-300'>Reject</button>
        <button disabled={isLoading} onClick={() => { setRequestStatus("Accepted"); updateStatus("Accepted"); }} className=' bg-green-800 text-white px-8 py-1.5 my-2.5 rounded-xl text-lg disabled:bg-green-300'>Accept</button>
      </div>
    </div>
  )
}

export default AdminBooking
