import React from 'react'

const UserBooking = () => {
    return (
        <div className='bg-white rounded-xl mx-8 my-3 px-6 py-2'>
            <p className='my-2 text-xl font-semibold'>Electrical Repairs</p>

            <div className='flex justify-between'>
                <p className='my-2 text-gray-700'>Date: 15 Dec,2035 at 2 pm</p>
                <p className='my-2 text-gray-700 text-sm bg-green-200 rounded px-2'>Confirmed</p>

            </div>

            <hr className='text-gray-300 ' />

            <div className=' flex justify-between'>
                <p className=' bg-black h-12 w-12 my-2 rounded-full'>.</p>
                <h2 className=' font-bold my-auto'>John Doe</h2>
            </div>
        </div>
    )
}

export default UserBooking