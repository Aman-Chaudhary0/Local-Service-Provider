import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { getApiErrorMessage, normalizeApiResponse } from '../utils/api'


const Navbar = () => {

    const token = localStorage.getItem("admin_token");
    const navigate = useNavigate();

    // logout state's
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [logoutError, setLogoutError] = useState("");

    // Logout
    const logout = async () => {
        try {
            setIsLoggingOut(true);
            setLogoutError("");

            // different route for admin registration
            const res = await axios.post("http://localhost:3000/api/auth/logout-admin", {}, {
                withCredentials: true
            });
            const apiResponse = normalizeApiResponse(res, "Logged out successfully")

            // if api fetch unsuccessfull
            if (!apiResponse.ok) {
                setLogoutError(apiResponse.message || "Logout failed")
            }


            // Remove token from localStorage
            localStorage.removeItem("admin_token");
            localStorage.removeItem("_id");
            navigate("/");

            // Refresh page to update UI
            window.location.reload();

        } catch (error) {
            console.error("Logout error:", error);
            setLogoutError(getApiErrorMessage(error, "Logout failed"));

            // Even if logout fails, remove token from localStorage
            localStorage.removeItem("admin_token");
            localStorage.removeItem("_id");
            window.location.reload();
        } finally {
            setIsLoggingOut(false);
        }
    }



//============================================================================================================================================================//
    return (
        <div className='flex flex-wrap justify-between gap-3 bg-blue-100 px-4 py-3'>
            {logoutError && <p className='absolute left-1/2 top-16 z-10 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded bg-red-100 px-4 py-2 text-sm text-red-700'>{logoutError}</p>}

            <div className='flex items-center min-w-0'>
                <img className='w-10 h-10 rounded-full' src={assets.logo} alt="" />
                <h2 className='font-bold pl-4 text-xl max-sm:hidden'>Local Service Provider</h2>
            </div>


            <div className='flex w-full justify-end sm:w-auto' >


                {/* change signup btn on basis of login/logout  */}
                {!token && <button onClick={() => navigate("/")} className='font-semibold bg-blue-700 text-white px-4 py-1.5 rounded-xl cursor-pointer w-full sm:w-30'>Sign In</button>
                }

                {token && <button disabled={isLoggingOut} onClick={logout} className='font-semibold bg-blue-700 text-white px-4 py-1.5 rounded-xl cursor-pointer w-full sm:w-30 disabled:bg-blue-400'>{isLoggingOut ? "Logging out..." : "Logout"}</button>
                }


                {/* btn to close navbar */}

            </div>


        </div>
    )
}

export default Navbar
