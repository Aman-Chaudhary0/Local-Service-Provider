import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'

const LoginPopup = ({ setShowLogin }) => {

    // all inputs on the basis that user want to login or sign up
    const [currState, setCurrState] = useState("Sign Up")

    // set inputs in form
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    // handle input values in form
    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    };


    // handle actions perform on form submition
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            // set api url on the basis of login or registration
            const endpoint = currState === "Login"
                ? "http://localhost:3000/api/auth/login"
                : "http://localhost:3000/api/auth/register";

            const res = await axios.post(endpoint, formData, {
                withCredentials: true   // for cookies


            })

            // empty form after registration
            setFormData({ username: "", email: "", password: "" })

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='z-1 absolute bg-blue-50 border-2 border-gray-500 rounded p-4 h-120 w-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>

            <img onClick={() => setShowLogin(false)} className='w-6 h-6 absolute left-0 top-0 cursor-pointer' src={assets.Cross_icon} alt="" />

            {/* Registration or login form  */}
            <form onSubmit={handleSubmit}>
                <h2 className='text-center text-2xl font-semibold'>{currState}</h2>

                <div className='flex flex-col'>

                    {/* show username field only for registration */}
                    {currState === "Login" ? <></> : <input required value={formData.username} className='w-auto my-2 py-1 rounded px-2 border border-gray-500 mx-2' type="text" placeholder='Your Name' onChange={handleChange} name='username' />}

                    <input required value={formData.email} className='w-auto my-2 py-1 rounded px-2 border border-gray-500 mx-2' type="email" placeholder='Your Email' onChange={handleChange} name='email' />

                    <input required value={formData.password} className='w-auto my-2 py-1 rounded px-2 border border-gray-500 mx-2' type="password" placeholder='Your Password' name='password' onChange={handleChange} />

                    <div className='flex items-start'>

                        <input required type="checkbox" className='m-4 ' />
                        <p> By Continuing, i agree to the terms of use and privicy policy</p>

                    </div>

                    <button type='submit' className='bg-blue-900 w-[60%] mx-auto py-2 rounded-lg text-white font-semibold my-3 cursor-pointer'>{currState}</button>

                </div>
            </form>


            {/* move to sign up from login and login from sign up */}
            {currState === "Login" ?
                <p className='mx-4'>Create a new account? <span className='text-blue-800 cursor-pointer' onClick={() => { setCurrState("Sign Up"); setFormData({ username: "", email: "", password: "" }) }}>Click here</span></p> :
                <p className='mx-4'>Already have an account?  <span className='text-blue-800 cursor-pointer' onClick={() => { setCurrState("Login"); setFormData({ username: "", email: "", password: "" }) }}> Login here</span></p>
            }

        </div>
    )
}

export default LoginPopup
