import React, { useState } from 'react'
import { assets } from '../assets/assets'

const token = localStorage.getItem("token");

    // Logout
    const logout = async () => {
        try {
            await axios.post("http://localhost:3000/api/auth/logout", {}, {
                withCredentials: true
            });
            // Remove token from localStorage
            localStorage.removeItem("token");

            // Refresh page to update UI
            window.location.reload();

        } catch (error) {
            console.error("Logout error:", error);
            
            // Even if logout fails, remove token from localStorage
            localStorage.removeItem("token");
            window.location.reload();
        }
    }



const Navbar = ({ setShowLogin }) => {

    return (
        <div className='flex justify-between bg-blue-100 h-15 items-center px-4'>

            <div className='flex items-center'>
                <img className='w-10 h-10 rounded-full' src={assets.logo} alt="" />
                <h2 className='font-bold pl-4 text-xl'>Local Service Provider</h2>
            </div>


            <div className='flex navbar' >


                {/* change signup btn on basis of login/logout  */}
                {!token && <button onClick={() => setShowLogin(true)} className='font-semibold bg-blue-700 text-white px-4 py-1.5 mx-3 rounded-xl cursor-pointer w-30'>Sign In</button>
                }
                {token && <button onClick={logout} className='font-semibold bg-blue-700 text-white px-4 py-1.5 mx-3 rounded-xl cursor-pointer w-30'>Logout</button>
                }


                {/* btn to close navbar */}

            </div>


        </div>
    )
}

export default Navbar