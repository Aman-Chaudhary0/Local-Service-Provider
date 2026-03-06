import React, { useState } from 'react'
import axios from 'axios'

const Register = ({ setShowLogin }) => {

    // all inputs on the basis that user want to login or sign up
    const [currState, setCurrState] = useState("Sign Up")

    // set inputs in form
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "admin"
    });

    // error message state
    const [errorMessage, setErrorMessage] = useState("");

    // handle input values in form
    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    };


    // handle actions perform on form submition
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {

            // set api url on the basis of login or registration
            const endpoint = currState === "Login"
                ? "http://localhost:3000/api/auth/login"
                : "http://localhost:3000/api/auth/register";

            const res = await axios.post(endpoint, formData, {
                withCredentials: true   // for cookies
            })

            // login not allowed when user is normal user
            if (res.data.user.role === "user" && endpoint === "http://localhost:3000/api/auth/login") {
                return
            }


            // Check if response is successful
            if (res.data.success) {

                // Set token in local storage on successful login/registration
                if (res.data.user && res.data.user.id) {
                    localStorage.setItem("token", res.data.token);

                    // Refresh page to update UI
                    window.location.reload();
                }
                setCurrState("Login");
                setFormData({ username: "", email: "", password: "", role: "admin" })
                setShowLogin(false);
            } else {
                // Show error message from server
                setErrorMessage(res.data.message || "An error occurred");
            }

        } catch (error) {
            console.log(error);
            setErrorMessage(error.response?.data?.message || error.message || "Registration failed. Please try again.");
        }
    }


    return (
        <div className='z-1 absolute bg-blue-50 border-2 border-gray-500 rounded p-4 h-120 w-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>


            {/* Registration or login form  */}
            <form onSubmit={handleSubmit}>
                {errorMessage && <p className='text-red-600 text-center my-2'>{errorMessage}</p>}

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

export default Register
