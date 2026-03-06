import React from 'react'
import UserBookingsList from '../components/UserBookingsList'

const UserDashboard = () => {
    return (
        <div className='bg-blue-50'>
            <div className='bg-cyan-50 flex justify-between'>
                <h2 className=' font-bold text-4xl m-5 max-sm:text-3xl'>Welcome Back, Sarah!</h2>
                <p className=' bg-black h-30 w-30 rounded-full m-4 max-sm:h-25 max-sm:w-25 '>.</p>
            </div>

            <UserBookingsList />
        </div>
    )
}

export default UserDashboard