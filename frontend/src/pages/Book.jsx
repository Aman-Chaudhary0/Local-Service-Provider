import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { validateBookingForm } from '../validators/bookingValidation'
import { getApiErrorMessage } from '../utils/api'

// user can book a service 
const Book = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { adminId, service } = location.state || {};
  const fallbackAdminId = sessionStorage.getItem("selectedProviderId");

  // set empty ,loading,success , error state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [emptyMessage, setEmptyMessage] = useState("");

  // create formdata to store data from form
  const [formData, setFormData] = useState({
    adminId: adminId || fallbackAdminId || "",
    bookService: service,
    date: "",
    time: "",
    address: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      adminId: adminId || fallbackAdminId || "",
    }))
  }, [adminId, fallbackAdminId])

  // value change during input
  const handleChange = (e) => {
    setErrorMessage("");
    setSuccessMessage("");
    setEmptyMessage("");
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setEmptyMessage("");
    const validationErrors = validateBookingForm(formData)

    // if any input is empty show empty msg
    if (!formData.adminId || !formData.bookService || !formData.date || !formData.time || !formData.address.trim()) {
      setErrorMessage(Object.values(validationErrors).find(Boolean) || "Please fill all booking details");
      return;
    }


    // display validation errors
    if (Object.values(validationErrors).some(Boolean)) {
      setErrorMessage(Object.values(validationErrors).find(Boolean) || "Please enter valid booking details")
      return;
    }

    try {

      // fetchiing api
      setIsLoading(true);
      await axios.post("http://localhost:3000/api/add/bookservice", {
        ...formData,
        address: formData.address.trim(),
      }, {
        withCredentials: true
      })

      // set from data empty after form submition
      setFormData({
        adminId: adminId || fallbackAdminId || "",
        bookService: service || "",
        date: "",
        time: "",
        address: ""
      })

      // move dashboard after form submition
      setSuccessMessage("Booking created successfully");
      setTimeout(() => {
        navigate("/dashboard");
      }, 800);

    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "Unable to book service"));
    } finally {
      setIsLoading(false);
    }


  }


  //============================================================================================================================================================//
  return (
    <div>

      <h2 className='bg-blue-200 text-center text-5xl font-bold text-slate-700 py-6'>Book Your Service</h2>


      <form className='bg-gray-100 m-10 rounded-lg border border-slate-600 py-6 flex flex-col' onSubmit={handleSubmit}>

        {/* error ,success, loading, empty messages */}
        {emptyMessage && <p className='mx-7 mb-2 rounded bg-yellow-100 px-4 py-3 text-yellow-800'>{emptyMessage}</p>}
        {errorMessage && <p className='mx-7 mb-2 rounded bg-red-100 px-4 py-3 text-red-700'>{errorMessage}</p>}
        {successMessage && <p className='mx-7 mb-2 rounded bg-green-100 px-4 py-3 text-green-700'>{successMessage}</p>}
        {isLoading && <p className='mx-7 mb-2 rounded bg-blue-100 px-4 py-3 text-blue-700'>Submitting booking...</p>}

        <label className='w-full mx-7 text-blue-950 font-semibold text-2xl mt-3' htmlFor="date" >Select Date</label>
        <input name='date' value={formData.date} onChange={handleChange} className='w-[90%] px-4 py-1 rounded mx-7 border outline-none border-gray-400 text-lg my-3' type="date" id='date' placeholder='Select Date' />

        <label className='w-full mx-7 text-blue-950 font-semibold text-2xl mt-3' htmlFor="time" >Select Time</label>
        <input name='time' value={formData.time} onChange={handleChange} className='w-[90%] px-4 py-1 rounded mx-7 border outline-none border-gray-400 text-lg my-3' type="time" id='time' placeholder='Select Time' />

        <label className='w-full mx-7 text-blue-950 font-semibold text-2xl mt-3' htmlFor="address">Enter Address</label>
        <textarea name='address' value={formData.address} onChange={handleChange} className='w-[90%] px-4 py-1 rounded mx-7 border outline-none border-gray-400 text-lg my-3' id="address"></textarea>

        <button disabled={isLoading} type='submit' className='bg-blue-500 w-[50%] m-auto py-2 rounded-2xl text-white font-semibold cursor-pointer my-4 disabled:bg-blue-300'>
          {isLoading ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  )
}

export default Book
