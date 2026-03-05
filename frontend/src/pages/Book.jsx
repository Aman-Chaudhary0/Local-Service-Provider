import React from 'react'

const Book = () => {
  return (
    <div>
        
        <h2 className='bg-blue-200 text-center text-5xl font-bold text-slate-700 py-6'>Book Your Service</h2>

        <form className='bg-gray-100 m-10 rounded-lg border border-slate-600 py-6 flex flex-col' action="">

            <label className='w-full mx-7 text-blue-950 font-semibold text-2xl mt-3' htmlFor="date">Select Date</label>
            <input className='w-[90%] px-4 py-1 rounded mx-7 border outline-none border-gray-400 text-lg my-3' type="date" id='date'placeholder='Select Date'/>

            <label className='w-full mx-7 text-blue-950 font-semibold text-2xl mt-3' htmlFor="time">Select Time</label>
            <input className='w-[90%] px-4 py-1 rounded mx-7 border outline-none border-gray-400 text-lg my-3' type="time" id='time' placeholder='Select Time' />

            <label className='w-full mx-7 text-blue-950 font-semibold text-2xl mt-3' htmlFor="address">Enter Address</label>
            <textarea className='w-[90%] px-4 py-1 rounded mx-7 border outline-none border-gray-400 text-lg my-3' name="" id="address"></textarea>

            <button className='bg-blue-500 w-[50%] m-auto py-2 rounded-2xl text-white font-semibold cursor-pointer my-4'>Confirm Booking</button>
        </form>
    </div>
  )
}

export default Book