import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'



// gaining data using props
const Service = ({ adminId, name, service, rate, experience }) => {

    const token = localStorage.getItem("token");
    // move to book page onClick book now
    const navigate = useNavigate()

    return (
        <div className='bg-white flex w-[80%] max-md:w-[90%] mx-auto my-2.5 justify-between items-center rounded max-md:flex-col py-6'>
            <img className='w-30 h-30 p-2' src={assets.profileLogo} alt="" />

            <div className='flex-1 ml-4'>

                <div className='flex justify-between mb-2'>
                    <div>
                        <h2 className='text-xl font-semibold '>{name} </h2>
                        <p className='text-gray-500'>{service}</p>
                    </div>


                </div>

                <hr className='text-gray-400' />

                <div className='flex justify-between items-center'>

                    <div className='flex gap-4 text-gray-500 '>
                        <p>{experience}</p>
                        <p>{rate}</p>
                    </div>

                    {/* if user is login move to book page else move to home page */}
                    <button
                        onClick={() => {
                            if (token) {
                                sessionStorage.setItem("selectedProviderId", adminId || "")
                                navigate("/book", { state: { adminId, service } })
                            } else {
                                navigate("/")
                            }
                        }}
                        className='px-4 py-2 mx-3 bg-blue-900 text-white rounded'
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Service
