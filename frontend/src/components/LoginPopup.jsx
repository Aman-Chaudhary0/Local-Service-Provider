import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { initialAuthFormData, validateAuthForm } from '../validators/authValidation'
import { getApiErrorMessage, normalizeApiResponse } from '../utils/api'

const LoginPopup = ({ setShowLogin }) => {

    // all inputs on the basis that user want to login or sign up
    const [currState, setCurrState] = useState("Sign Up")

    // set success , error, empty and loading state
    const [success, setSuccess] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [emptyMessage, setEmptyMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    // set inputs in form
    const [formData, setFormData] = useState(initialAuthFormData);

    // reset error and success messages
    const resetMessages = () => {
        setErrorMessage("")
        setSuccess("")
        setEmptyMessage("")
    }

    // reset form data
    const resetFormState = (nextState) => {
        setCurrState(nextState)
        setFormData(initialAuthFormData)
        resetMessages()
    }

    // handle input values in form
    const handleChange = (e) => {
        resetMessages()
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    };


    // handle actions perform on form submition
    const handleSubmit = async (e) => {
        e.preventDefault();
        resetMessages()

        // validate form data by providing form data and curr state
        const validationErrors = validateAuthForm({ formData, currState })
        if (Object.keys(validationErrors).length > 0) {
            setErrorMessage(Object.values(validationErrors).find(Boolean) || "Please enter valid details")
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
                    email: formData.email.trim(),
                    password: formData.password.trim(),
                }
                : {
                    username: formData.username.trim(),
                    email: formData.email.trim(),
                    password: formData.password.trim(),
                };

            const res = await axios.post(endpoint, payload, {
                withCredentials: true   // for cookies
            })
            const apiResponse = normalizeApiResponse(res, isLogin ? "Login successful" : "Registration successful")
            const responseData = apiResponse.data

            // login not allowed when user is admin
            if (responseData?.user?.role === "admin" && endpoint === "http://localhost:3000/api/auth/login") {
                setErrorMessage("Admin login is not allowed here");
                return
            }

            // Check if response is successful
            if (apiResponse.ok) {
                setSuccess(apiResponse.message || "Success");

                // Set token in local storage on successful login/registration
                if (responseData?.user?.id) {
                    localStorage.setItem("user_token", responseData.token);
                    localStorage.setItem("id", responseData.user.id);

                    setTimeout(() => {
                        window.location.reload();
                    }, 700);
                }
                setCurrState("Login");
                setFormData(initialAuthFormData)
                setTimeout(() => {
                    setShowLogin(false);
                }, 700);
            } else {
                // Show error message from server
                setErrorMessage(apiResponse.message || "An error occurred");
            }

        } catch (error) {
            setErrorMessage(getApiErrorMessage(error, "Something went wrong"));
        } finally {
            setIsLoading(false)
        }
    }


    //============================================================================================================================================================//
    return (
        <div className='fixed inset-0 z-20 flex items-center justify-center bg-slate-900/30 p-4'>
        <div className='relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-slate-200 bg-blue-50 p-4 shadow-xl'>

            <img onClick={() => setShowLogin(false)} className='absolute left-3 top-3 h-6 w-6 cursor-pointer' src={assets.Cross_icon} alt="" />

            {/* Registration or login form  */}
            <form onSubmit={handleSubmit}>
                <h2 className='text-center text-2xl font-semibold'>{currState}</h2>


                {/* error messages */}
                {emptyMessage && <p className='mx-2 mt-3 rounded bg-yellow-100 px-3 py-2 text-sm text-yellow-800'>{emptyMessage}</p>}
                {errorMessage && <p className='mx-2 mt-3 rounded bg-red-100 px-3 py-2 text-sm text-red-700'>{errorMessage}</p>}
                {success && <p className='mx-2 mt-3 rounded bg-green-100 px-3 py-2 text-sm text-green-700'>{success}</p>}
                {isLoading && <p className='mx-2 mt-3 rounded bg-blue-100 px-3 py-2 text-sm text-blue-700'>Please wait...</p>}

                <div className='flex flex-col'>

                    {/* show username field only for registration */}
                    {currState === "Login" ? <></> : <input value={formData.username} className='my-2 w-full rounded border border-gray-500 px-3 py-2' type="text" placeholder='Your Name' onChange={handleChange} name='username' />}

                    <input value={formData.email} className='my-2 w-full rounded border border-gray-500 px-3 py-2' type="email" placeholder='Your Email' onChange={handleChange} name='email' />

                    <input value={formData.password} className='my-2 w-full rounded border border-gray-500 px-3 py-2' type="password" placeholder='Your Password' name='password' onChange={handleChange} />

                    <div className='flex items-start gap-2'>

                        <input type="checkbox" className='mt-1' required />
                        <p className='text-sm text-slate-700'>By continuing, I agree to the terms of use and privacy policy.</p>

                    </div>

                    <button disabled={isLoading} type='submit' className='mx-auto my-3 w-full rounded-lg bg-blue-900 py-3 text-white font-semibold cursor-pointer disabled:bg-blue-400 sm:w-[60%]'>
                        {isLoading ? "Loading..." : currState}
                    </button>

                </div>
            </form>


            {/* move to sign up from login and login from sign up */}
            {currState === "Login" ?
                <p className='mx-4'>Create a new account? <span className='text-blue-800 cursor-pointer' onClick={() => resetFormState("Sign Up")}>Click here</span></p> :
                <p className='mx-4'>Already have an account?  <span className='text-blue-800 cursor-pointer' onClick={() => resetFormState("Login")}> Login here</span></p>
            }

        </div>
        </div>
    )
}

export default LoginPopup
