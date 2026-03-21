import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { initialAdminAuthFormData, validateAdminAuthForm } from '../validators/authValidation'
import { getApiData, getApiErrorMessage } from '../utils/api'

const Register = () => {

    const navigate = useNavigate();

    // all inputs on the basis that user want to login or sign up
    const [currState, setCurrState] = useState("Sign Up")

    // state for success, error,loading
    const [successMessage, setSuccessMessage] = useState("");
    const [emptyMessage, setEmptyMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // set inputs in form
    const [formData, setFormData] = useState(initialAdminAuthFormData);

    // error message state
    const [errorMessage, setErrorMessage] = useState("");

    // handle input values in form
    const handleChange = (e) => {
        setErrorMessage("");
        setSuccessMessage("");
        setEmptyMessage("");
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    };


    // handle actions perform on form submition
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");
        setEmptyMessage("");
        const validationErrors = validateAdminAuthForm({ formData, currState })
        if (Object.keys(validationErrors).length > 0) {
            setErrorMessage(Object.values(validationErrors).find(Boolean) || "Please enter valid details");
            return;
        }

        try {
            setIsLoading(true);

            // set api url on the basis of login or registration
            const isLogin = currState === "Login"
            const endpoint = isLogin
                ? "http://localhost:3000/api/auth/login"
                : "http://localhost:3000/api/auth/register";

            // use payload only when user want to login and trim data before submition
            const payload = isLogin
                ? {
                    email: formData.email.trim(),
                    password: formData.password.trim(),
                }
                : {
                    username: formData.username.trim(),
                    email: formData.email.trim(),
                    password: formData.password.trim(),
                    role: "admin"
                };

            const res = await axios.post(endpoint, payload, {
                withCredentials: true   // for cookies
            })
            const responseData = getApiData(res)

            // login not allowed when user is normal user
            if (responseData?.user?.role === "user" && endpoint === "http://localhost:3000/api/auth/login") {
                setErrorMessage("User login is not allowed here");
                return
            }


            // Check if response is successful
            if (res.data.success) {
                setSuccessMessage(res.data.message || "Success");

                // Set token in local storage on successful login/registration
                if (responseData?.user?.id) {
                    localStorage.setItem("admin_token", responseData.token);
                    localStorage.setItem("_id", responseData.user.id);

                    setTimeout(() => {
                        navigate("/admin/dashboard");
                        window.location.reload();
                    }, 700);
                }
                setCurrState("Login");
                setFormData(initialAdminAuthFormData)
            } else {
                // Show error message from server
                setErrorMessage(res.data.message || "An error occurred");
            }

        } catch (error) {
            console.log(error);
            setErrorMessage(getApiErrorMessage(error, "Registration failed. Please try again."));
        } finally {
            setIsLoading(false);
        }
    }


    //============================================================================================================================================================//
    return (
        <div className='z-1 absolute bg-blue-50 border-2 border-gray-500 rounded p-4 h-120 w-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>


            {/* Registration or login form  */}
            <form onSubmit={handleSubmit}>


                {/* Error messages */}
                {emptyMessage && <p className='mx-2 mt-3 rounded bg-yellow-100 px-3 py-2 text-sm text-yellow-800'>{emptyMessage}</p>}
                {errorMessage && <p className='text-red-600 text-center my-2'>{errorMessage}</p>}
                {successMessage && <p className='mx-2 mt-3 rounded bg-green-100 px-3 py-2 text-sm text-green-700'>{successMessage}</p>}
                {isLoading && <p className='mx-2 mt-3 rounded bg-blue-100 px-3 py-2 text-sm text-blue-700'>Please wait...</p>}

                <h2 className='text-center text-2xl font-semibold'>{currState}</h2>

                <div className='flex flex-col'>

                    {/* show username field only for registration */}
                    {currState === "Login" ? <></> : <input value={formData.username} className='w-auto my-2 py-1 rounded px-2 border border-gray-500 mx-2' type="text" placeholder='Your Name' onChange={handleChange} name='username' />}

                    <input value={formData.email} className='w-auto my-2 py-1 rounded px-2 border border-gray-500 mx-2' type="email" placeholder='Your Email' onChange={handleChange} name='email' />

                    <input value={formData.password} className='w-auto my-2 py-1 rounded px-2 border border-gray-500 mx-2' type="password" placeholder='Your Password' name='password' onChange={handleChange} />

                    <div className='flex items-start'>

                        <input type="checkbox" className='m-4 ' required />
                        <p> By Continuing, i agree to the terms of use and privicy policy</p>

                    </div>

                    <button disabled={isLoading} type='submit' className='bg-blue-900 w-[60%] mx-auto py-2 rounded-lg text-white font-semibold my-3 cursor-pointer disabled:bg-blue-400'>
                        {isLoading ? "Loading..." : currState}
                    </button>

                </div>
            </form>


            {/* move to sign up from login and login from sign up */}
            {currState === "Login" ?
                <p className='mx-4'>Create a new account? <span className='text-blue-800 cursor-pointer' onClick={() => { setCurrState("Sign Up"); setFormData(initialAdminAuthFormData); setErrorMessage(""); setSuccessMessage(""); setEmptyMessage(""); }}>Click here</span></p> :
                <p className='mx-4'>Already have an account?  <span className='text-blue-800 cursor-pointer' onClick={() => { setCurrState("Login"); setFormData(initialAdminAuthFormData); setErrorMessage(""); setSuccessMessage(""); setEmptyMessage(""); }}> Login here</span></p>
            }

        </div>
    )
}

export default Register
