import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

// user can book a service 
const Book = () => {
  const location = useLocation();
  const { adminId, service } = location.state || {};
  const fallbackAdminId = sessionStorage.getItem("selectedProviderId");

  const id = localStorage.getItem("id");

  // create formdata to store data from form
  const [formData, setFormData] = useState({
    id,
    adminId: adminId || fallbackAdminId || "",
    bookService: service,
    date: "",
    time: "",
    address: ""
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      id: id || "",
      adminId: adminId || fallbackAdminId || "",
    }))
  }, [id, adminId, fallbackAdminId])

  // value change during input
  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/add/bookservice", formData, {
        withCredentials: true
      })

      setFormData({
        date: "",
        time: "",
        address: ""
      })

    } catch (error) {
      console.log(error);
    }


  }

  return (
    <div>

      <h2 className='bg-blue-200 text-center text-5xl font-bold text-slate-700 py-6'>Book Your Service</h2>


      <form className='bg-gray-100 m-10 rounded-lg border border-slate-600 py-6 flex flex-col' onSubmit={handleSubmit}>

        <label className='w-full mx-7 text-blue-950 font-semibold text-2xl mt-3' htmlFor="date" >Select Date</label>
        <input required name='date' value={formData.date} onChange={handleChange} className='w-[90%] px-4 py-1 rounded mx-7 border outline-none border-gray-400 text-lg my-3' type="date" id='date' placeholder='Select Date' />

        <label className='w-full mx-7 text-blue-950 font-semibold text-2xl mt-3' htmlFor="time" >Select Time</label>
        <input required name='time' value={formData.time} onChange={handleChange} className='w-[90%] px-4 py-1 rounded mx-7 border outline-none border-gray-400 text-lg my-3' type="time" id='time' placeholder='Select Time' />

        <label className='w-full mx-7 text-blue-950 font-semibold text-2xl mt-3' htmlFor="address">Enter Address</label>
        <textarea required name='address' value={formData.address} onChange={handleChange} className='w-[90%] px-4 py-1 rounded mx-7 border outline-none border-gray-400 text-lg my-3' id="address"></textarea>

        <button type='submit' className='bg-blue-500 w-[50%] m-auto py-2 rounded-2xl text-white font-semibold cursor-pointer my-4'>Confirm Booking</button>
      </form>
    </div>
  )
}

export default Book
