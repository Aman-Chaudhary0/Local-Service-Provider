import React from 'react'
import { assets } from '../assets/assets'

// it is the user booking info section
const UserBooking = ({ adminName, time, date, bookService }) => {
    return (
        <div className='bg-white rounded-xl mx-8 my-3 px-6 py-2'>
            <p className='my-2 text-xl font-semibold'>{bookService}</p>

            <div className='flex justify-between'>
                <p className='my-2 text-gray-700'>Date: {date} at {time}</p>
                <p className='my-2 text-gray-700 text-sm bg-green-200 rounded px-2'>Confirmed</p>

            </div>

            <hr className='text-gray-300 ' />

            <div className=' flex justify-between'>
                <img src={assets.profileLogo} className=' h-12 w-12 my-2 rounded-full' />
                <h2 className=' font-bold my-auto'>{adminName}</h2>
            </div>
        </div>
    )
}

export default UserBooking