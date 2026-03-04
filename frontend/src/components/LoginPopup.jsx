import React, { useState } from 'react'
import { assets } from '../assets/assets'

const LoginPopup = ({ setShowLogin }) => {

    // user want login or sign up
    // all inputs on the basis that user want to login or sign up
    const [currState, setCurrState] = useState("Sign Up")


    return (
        <div className='z-1 absolute bg-blue-50 border-2 border-gray-500 rounded p-4 h-120 w-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>

            <img onClick={() => setShowLogin(false)} className='w-6 h-6 absolute left-0 top-0 cursor-pointer' src={assets.Cross_icon} alt="" />

            <form action="">
                <h2 className='text-center text-2xl font-semibold'>{currState}</h2>

                <div className='flex flex-col'>
                    {currState === "Login" ? <></> : <input required className='w-auto my-2 py-1 rounded px-2 border border-gray-500 mx-2' type="text" placeholder='Your Name' />}

                    <input required className='w-auto my-2 py-1 rounded px-2 border border-gray-500 mx-2' type="email" placeholder='Your Email' />
                    <input required className='w-auto my-2 py-1 rounded px-2 border border-gray-500 mx-2' type="password" placeholder='Your Password' />

                    <div className='flex items-start'>
                        <input required type="checkbox" className='m-4 ' />
                        <p> By Continuing, i agree to the terms of use and privicy policy</p>

                    </div>

                    <button type='submit' className='bg-blue-900 w-[60%] mx-auto py-2 rounded-lg text-white font-semibold my-3 cursor-pointer'>{currState}</button>

                </div>
            </form>


            {/* move to sign up from login and login from sign up */}
            {currState === "Login" ?
                <p className='mx-4'>Create a new account? <span className='text-blue-800 cursor-pointer' onClick={() => setCurrState("Sign Up")}>Click here</span></p> :
                <p className='mx-4'>Already have an account?  <span className='text-blue-800 cursor-pointer' onClick={() => setCurrState("Login")}> Login here</span></p>
            }



        </div>
    )
}

export default LoginPopup