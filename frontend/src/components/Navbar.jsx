import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { getApiErrorMessage, normalizeApiResponse } from '../utils/api'



const Navbar = ({ setShowLogin }) => {

    // set navbar is open or close in small window
    const [isOpen, setIsOpen] = useState(false);

    // set logout state
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [logoutError, setLogoutError] = useState("");

    // underline on clicked menu
    const [menu, setMenu] = useState("home");

    // get token
    const token = localStorage.getItem("user_token");

    const navigate = useNavigate()


    // Logout
    const logout = async () => {
        try {
            setIsLoggingOut(true);
            setLogoutError("");
            const res = await axios.post("http://localhost:3000/api/auth/logout", {}, {
                withCredentials: true
            });
            const apiResponse = normalizeApiResponse(res, "Logged out successfully")

             // if api fetch unsuccessfull
            if (!apiResponse.ok) {
                setLogoutError(apiResponse.message || "Logout failed")
            }

            navigate("/");
            // Remove token from localStorage
            localStorage.removeItem("user_token");
            localStorage.removeItem("id");
            // Refresh page to update UI
            window.location.reload();


        } catch (error) {
            console.error("Logout error:", error);
            setLogoutError(getApiErrorMessage(error, "Logout failed"));
            // Even if logout fails, remove token from localStorage
            localStorage.removeItem("user_token");
            window.location.reload();

            // finally run always not based on try or catch
        } finally {
            setIsLoggingOut(false);
        }
    }



    //============================================================================================================================================================//
    return (
        <div className='flex justify-between bg-blue-100 h-15 items-center px-4'>
            {logoutError && <p className='absolute left-1/2 top-16 z-10 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded bg-red-100 px-4 py-2 text-sm text-red-700'>{logoutError}</p>}

            <div className='flex items-center'>
                <img onClick={() => navigate("/")} className='w-10 h-10 rounded-full' src={assets.logo} alt="" />
                <h2 className='font-bold pl-4 text-xl max-sm:hidden'>Local Service Provider</h2>
            </div>


            {/* btn to open navbar */}
            <img onClick={() => setIsOpen(true)} className='h-6 w-6 hidden nav-menu' src={assets.Menu_icon} alt="" />


            {/* if navbar is open it is 0px from right and if navbar is close it is -200px from right */}
            <div className='flex navbar max-md: rounded-bl-xl' style={{ right: isOpen ? '0' : '-200px' }}>

                <ul className='flex font-medium items-center'>
                    <li onClick={() => (setMenu("home"), navigate("/"))} className={` ${menu === "home" ? "active" : ""} px-3 text-neutral-700 cursor-pointer`}>Home</li>
                    <li onClick={() => (setMenu("services"), navigate("/services"))} className={` ${menu === "services" ? "active" : ""} px-3 text-neutral-700 cursor-pointer`}>Services</li>
                    <li onClick={() => setMenu("about")} className={` ${menu === "about" ? "active" : ""} px-3 text-neutral-700 cursor-pointer`}>About</li>
                    <li onClick={() => setMenu("contact")} className={` ${menu === "contact" ? "active" : ""} px-3 text-neutral-700 cursor-pointer`}>Contact</li>
                </ul>


                {/* change signup btn on basis of login/logout  */}
                {!token && <button onClick={() => setShowLogin(true)} className='font-semibold bg-blue-700 text-white px-4 py-1.5 mx-3 rounded-xl cursor-pointer w-30'>Sign In</button>
                }

                {token && <button disabled={isLoggingOut} onClick={logout} className='font-semibold bg-blue-700 text-white px-4 py-1.5 rounded-xl cursor-pointer w-30 disabled:bg-blue-400'>{isLoggingOut ? "Logging out..." : "Logout"}</button>
                }

                {/* user profile logo */}
                <img onClick={() => navigate("/dashboard")} src={assets.profileLogo} className='h-10 w-10 rounded-full mx-2 max-md:m-2 ' alt="" />


                {/* btn to close navbar */}
                <img onClick={() => setIsOpen(false)} className='w-6 h-6 hidden nav-cross' src={assets.Cross_icon} />
            </div>


        </div>
    )
}

export default Navbar
