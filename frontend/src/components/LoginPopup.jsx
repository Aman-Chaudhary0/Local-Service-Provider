import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'

const LoginPopup = ({ setShowLogin }) => {

    // all inputs on the basis that user want to login or sign up
    const [currState, setCurrState] = useState("Sign Up")

    // set success , error, empty and loading state
    const [success, setSuccess] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [emptyMessage, setEmptyMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    // set inputs in form
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    // handle input values in form
    const handleChange = (e) => {
        setErrorMessage("")
        setSuccess("")
        setEmptyMessage("")
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    };


    // handle actions perform on form submition
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("")
        setSuccess("")
        setEmptyMessage("")

        const isSignUp = currState === "Sign Up";
        const hasEmptyFields = isSignUp
            ? !formData.username.trim() || !formData.email.trim() || !formData.password.trim()
            : !formData.email.trim() || !formData.password.trim();

        if (hasEmptyFields) {
            setEmptyMessage("Please fill all required fields");
            return;
        }

        try {
            setIsLoading(true)

            // set api url on the basis of login or registration
            const isLogin = currState === "Login"
            const endpoint = isLogin
                ? "http://localhost:3000/api/auth/login"
                : "http://localhost:3000/api/auth/register";

            //use payload only when user want to login
            const payload = isLogin
                ? {
                    email: formData.email,
                    password: formData.password,
                }
                : formData;

            const res = await axios.post(endpoint, payload, {
                withCredentials: true   // for cookies
            })

            // login not allowed when user is admin
            if (res.data.user.role === "admin" && endpoint === "http://localhost:3000/api/auth/login") {
                setErrorMessage("Admin login is not allowed here");
                return
            }

            // Check if response is successful
            if (res.data.success) {
                setSuccess(res.data.message || "Success");

                // Set token in local storage on successful login/registration
                if (res.data.user && res.data.user.id) {
                    localStorage.setItem("user_token", res.data.token);
                    localStorage.setItem("id", res.data.user.id);

                    setTimeout(() => {
                        window.location.reload();
                    }, 700);
                }
                setCurrState("Login");
                setFormData({ username: "", email: "", password: "" })
                setTimeout(() => {
                    setShowLogin(false);
                }, 700);
            } else {
                // Show error message from server
                setErrorMessage(res.data.message || "An error occurred");
            }

        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Something went wrong");
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <div className='z-1 absolute bg-blue-50 border-2 border-gray-500 rounded p-4 h-120 w-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>

            <img onClick={() => setShowLogin(false)} className='w-6 h-6 absolute left-0 top-0 cursor-pointer' src={assets.Cross_icon} alt="" />

            {/* Registration or login form  */}
            <form onSubmit={handleSubmit}>
                <h2 className='text-center text-2xl font-semibold'>{currState}</h2>

                {emptyMessage && <p className='mx-2 mt-3 rounded bg-yellow-100 px-3 py-2 text-sm text-yellow-800'>{emptyMessage}</p>}
                {errorMessage && <p className='mx-2 mt-3 rounded bg-red-100 px-3 py-2 text-sm text-red-700'>{errorMessage}</p>}
                {success && <p className='mx-2 mt-3 rounded bg-green-100 px-3 py-2 text-sm text-green-700'>{success}</p>}
                {isLoading && <p className='mx-2 mt-3 rounded bg-blue-100 px-3 py-2 text-sm text-blue-700'>Please wait...</p>}

                <div className='flex flex-col'>

                    {/* show username field only for registration */}
                    {currState === "Login" ? <></> : <input required value={formData.username} className='w-auto my-2 py-1 rounded px-2 border border-gray-500 mx-2' type="text" placeholder='Your Name' onChange={handleChange} name='username' />}

                    <input required value={formData.email} className='w-auto my-2 py-1 rounded px-2 border border-gray-500 mx-2' type="email" placeholder='Your Email' onChange={handleChange} name='email' />

                    <input required value={formData.password} className='w-auto my-2 py-1 rounded px-2 border border-gray-500 mx-2' type="password" placeholder='Your Password' name='password' onChange={handleChange} />

                    <div className='flex items-start'>

                        <input required type="checkbox" className='m-4 ' />
                        <p> By Continuing, i agree to the terms of use and privicy policy</p>

                    </div>

                    <button disabled={isLoading} type='submit' className='bg-blue-900 w-[60%] mx-auto py-2 rounded-lg text-white font-semibold my-3 cursor-pointer disabled:bg-blue-400'>
                        {isLoading ? "Loading..." : currState}
                    </button>

                </div>
            </form>


            {/* move to sign up from login and login from sign up */}
            {currState === "Login" ?
                <p className='mx-4'>Create a new account? <span className='text-blue-800 cursor-pointer' onClick={() => { setCurrState("Sign Up"); setFormData({ username: "", email: "", password: "" }); setErrorMessage(""); setSuccess(""); setEmptyMessage(""); }}>Click here</span></p> :
                <p className='mx-4'>Already have an account?  <span className='text-blue-800 cursor-pointer' onClick={() => { setCurrState("Login"); setFormData({ username: "", email: "", password: "" }); setErrorMessage(""); setSuccess(""); setEmptyMessage(""); }}> Login here</span></p>
            }

        </div>
    )
}

export default LoginPopup
