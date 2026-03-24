import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { validateBookingForm } from '../validators/bookingValidation'
import { getApiErrorMessage, normalizeApiResponse } from '../utils/api'

// user can book a service 
const Book = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { adminId, service } = location.state || {};
  const fallbackAdminId = sessionStorage.getItem("selectedProviderId");
  const fallbackService = sessionStorage.getItem("selectedServiceName");

  // set empty ,loading,success , error state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [emptyMessage, setEmptyMessage] = useState("");

  // create formdata to store data from form
  const [formData, setFormData] = useState({
    adminId: adminId || fallbackAdminId || "",
    bookService: service || fallbackService || "",
    date: "",
    time: "",
    address: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      adminId: adminId || fallbackAdminId || "",
      bookService: service || fallbackService || "",
    }))
  }, [adminId, fallbackAdminId, service, fallbackService])

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

    if (!formData.adminId || !formData.bookService) {
      setErrorMessage("Please select a provider and service first");
      return;
    }

    // if any input is empty show empty msg
    if (!formData.date || !formData.time || !formData.address.trim()) {
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
      const res = await axios.post("http://localhost:3000/api/add/bookservice", {
        ...formData,
        address: formData.address.trim(),
      }, {
        withCredentials: true
      })
      const apiResponse = normalizeApiResponse(res, "Booking created successfully")

       // if api fetch unsuccessfull
      if (!apiResponse.ok) {
        setErrorMessage(apiResponse.message || "Unable to book service")
        return
      }

      // set from data empty after form submition
      setFormData({
        adminId: adminId || fallbackAdminId || "",
        bookService: service || fallbackService || "",
        date: "",
        time: "",
        address: ""
      })

      // move dashboard after form submition
      setSuccessMessage(apiResponse.message);
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
    <div className='bg-slate-50 py-10'>
      <div className='section-shell'>
      <div className='mb-6 space-y-2'>
        <p className='text-sm font-semibold uppercase tracking-[0.24em] text-blue-700'>Booking</p>
        <h2 className='text-4xl font-semibold tracking-tight text-slate-900 max-md:text-3xl'>Book your service</h2>
        <p className='text-base text-slate-600'>Choose a date, time, and address so the provider can confirm your request.</p>
      </div>

      <form className='surface-card flex flex-col gap-5 p-6 md:p-8' onSubmit={handleSubmit}>

        {/* error ,success, loading, empty messages */}
        {emptyMessage && <p className='feedback-banner feedback-warning'>{emptyMessage}</p>}
        {errorMessage && <p className='feedback-banner feedback-error'>{errorMessage}</p>}
        {successMessage && <p className='feedback-banner feedback-success'>{successMessage}</p>}
        {isLoading && <p className='feedback-banner feedback-info'>Submitting booking...</p>}

        <div className='grid gap-5 md:grid-cols-2'>
          <div className='space-y-2'>
        <label className='block text-sm font-semibold uppercase tracking-[0.16em] text-slate-600' htmlFor="date" >Select Date</label>
        <input name='date' value={formData.date} onChange={handleChange} className='field-input' type="date" id='date' placeholder='Select Date' />
          </div>

          <div className='space-y-2'>
        <label className='block text-sm font-semibold uppercase tracking-[0.16em] text-slate-600' htmlFor="time" >Select Time</label>
        <input name='time' value={formData.time} onChange={handleChange} className='field-input' type="time" id='time' placeholder='Select Time' />
          </div>
        </div>

        <div className='space-y-2'>
        <label className='block text-sm font-semibold uppercase tracking-[0.16em] text-slate-600' htmlFor="address">Enter Address</label>
        <textarea name='address' value={formData.address} onChange={handleChange} className='field-input min-h-32 resize-y' id="address"></textarea>
        </div>

        <button disabled={isLoading} type='submit' className='primary-button mt-2 w-full py-3 md:w-64'>
          {isLoading ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
      </div>
    </div>
  )
}

export default Book
