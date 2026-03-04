import React, { useState } from 'react'
import { assets } from '../assets/assets'


const Navbar = ({ setShowLogin }) => {

    // set navbar is open or close in small window
    const [isOpen, setIsOpen] = useState(false);

    // underline on clicked menu
    const [menu, setMenu] = useState("home");

    return (
        <div className='flex justify-between bg-blue-100 h-15 items-center px-4'>

            <div className='flex items-center'>
                <img className='w-10 h-10 rounded-full' src={assets.logo} alt="" />
                <h2 className='font-bold pl-4 text-xl'>Local Service Provider</h2>
            </div>

            {/* nav options */}

            <img onClick={() => setIsOpen(true)} className='h-6 w-6 hidden nav-menu' src={assets.Menu_icon} alt=""  />


            {/* if navbar is open it is 0px from right and if navbar is close it is -200px from right */}
            <div className='flex navbar' style={{ right: isOpen ? '0' : '-200px'}}>

                <ul className='flex font-medium items-center'>
                    <li onClick={() => setMenu("home")} className={` ${menu === "home" ? "active" : ""} px-3 text-neutral-700 cursor-pointer`}>Home</li>
                    <li onClick={() => setMenu("services")} className={` ${menu === "services" ? "active" : ""} px-3 text-neutral-700 cursor-pointer`}>Services</li>
                    <li onClick={() => setMenu("about")} className={` ${menu === "about" ? "active" : ""} px-3 text-neutral-700 cursor-pointer`}>About</li>
                    <li onClick={() => setMenu("contact")} className={` ${menu === "contact" ? "active" : ""} px-3 text-neutral-700 cursor-pointer`}>Contact</li>
                </ul>

                <button onClick={() => setShowLogin(true)} className='font-semibold bg-blue-700 text-white px-4 py-1.5 mx-3 rounded-xl cursor-pointer w-30'>Sign In</button>

                 <img onClick={() => setIsOpen(false)} className='w-6 h-6 hidden nav-cross' src={assets.Cross_icon} />
            </div>

           
        </div>
    )
}

export default Navbar