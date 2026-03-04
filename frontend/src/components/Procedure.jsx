import React from 'react'
import { assets } from '../assets/assets'


// procedure to book
const Procedure = () => {
  return (
    <div>
        <h2 className='text-center font-semibold text-3xl mt-1 mb-8'>Procedure</h2>

        <div className='flex justify-around max-md:flex-col max-md:items-center'>
            <div className='w-70 max-md:mb-6'>
                <img className=' h-35 w-full rounded-xl' src={assets.Search_Book} alt="" />
                <h2 className='text-lg font-semibold'>1. Search & Book</h2>
                <p>Browse services and select the one you need.</p>
            </div>

            <div className='w-70 max-md:mb-6'>
                <img className=' h-35 w-full rounded-xl' src={assets.Book_Schedule} alt="" />
                <h2 className='text-lg font-semibold'>2. Shedule Service</h2>
                <p>Choose your preferred date and time.</p>
            </div>

            <div className='w-70 max-md:mb-6'>
                <img className=' h-35 w-full rounded-xl' src={assets.Work_done} alt="" />
                <h2 className='text-lg font-semibold'>3. Get It Done</h2>
                <p>A professional comes to your location and completes your work</p>
            </div>
        </div>
    </div>
  )
}

export default Procedure