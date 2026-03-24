import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { getApiErrorMessage, normalizeApiResponse } from '../utils/api'

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
    const previousStatus = requestStatus
    const previousClick = click

    try {
      setIsLoading(true)
      setErrorMessage("")
      setSuccessMessage("")

      //api fetching
      const res = await axios.post("http://localhost:3000/api/get/requeststatus", {
        _id: bookingId,
        status: nextStatus,
      }, { withCredentials: true })
      const apiResponse = normalizeApiResponse(res, `Request ${nextStatus.toLowerCase()} successfully`)

      // if api get fail
      if (!apiResponse.ok) {
        setErrorMessage(apiResponse.message || "Failed to update status")
        setRequestStatus(previousStatus)
        setClick(previousClick)
        return
      }

      // api get succcess
      setSuccessMessage(apiResponse.message)
      setClick(true)
      setRequestStatus(nextStatus)

      // catching error
    } catch (err) {
      setErrorMessage(getApiErrorMessage(err, "Failed to update status"))
      setRequestStatus(previousStatus)
      setClick(previousClick)

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
    <div className='bg-white rounded-xl mx-8 my-3 px-6 py-4'>

      {/* booking info */}
      <div className='flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between'>
        <div>
          <p className='my-2 text-xl font-semibold'>Booking from: {userName}</p>
          <p className='my-2 text-gray-700'>Date: {date} at {time}</p>
          <p className='my-2 break- text-gray-700'>Address : {address}</p>
        </div>

        {/* current status */}
        <p className={`${color} inline-flex h-8 w-fit items-center rounded px-4 text-white`}>{requestStatus}</p>

      </div>

      <hr className='text-gray-300 ' />

      {/* error, success and loading state  */}
      {errorMessage && <p className='my-2 rounded bg-red-100 px-3 py-2 text-sm text-red-700'>{errorMessage}</p>}
      {successMessage && <p className='my-2 rounded bg-green-100 px-3 py-2 text-sm text-green-700'>{successMessage}</p>}
      {isLoading && <p className='my-2 rounded bg-blue-100 px-3 py-2 text-sm text-blue-700'>Updating request...</p>}

      {/* accept and reject btn  */}
      <div style={{ display: click ? "none" : "flex" }} className='flex flex-col gap-3 sm:flex-row sm:justify-around'>
        <button disabled={isLoading} onClick={() => { setRequestStatus("Rejected"); updateStatus("Rejected"); }} className='bg-red-500 text-white px-8 py-2 my-1 rounded-xl text-lg disabled:bg-red-300'>Reject</button>
        <button disabled={isLoading} onClick={() => { setRequestStatus("Accepted"); updateStatus("Accepted"); }} className='bg-green-800 text-white px-8 py-2 my-1 rounded-xl text-lg disabled:bg-green-300'>Accept</button>
      </div>
    </div>
  )
}

export default AdminBooking
