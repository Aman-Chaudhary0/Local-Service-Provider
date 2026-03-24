import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'



// gaining data using props
const Service = ({ adminId, name, service, rate, experience }) => {

    const token = localStorage.getItem("user_token");
    // move to book page onClick book now
    const navigate = useNavigate()


    //============================================================================================================================================================//
    return (
        <div className='surface-card flex items-center justify-between gap-6 px-6 py-6 max-md:flex-col max-md:items-start'>
            <img className='h-24 w-24 rounded-2xl border border-slate-200 bg-slate-50 p-3' src={assets.profileLogo} alt="" />

            <div className='flex-1 space-y-4'>

                <div className='space-y-1'>
                        <p className='text-sm font-medium uppercase tracking-[0.18em] text-blue-700'>Provider</p>
                        <h2 className='text-2xl font-semibold tracking-tight text-slate-900'>{name}</h2>
                        <p className='text-base text-slate-500'>{service}</p>
                    </div>

                <div className='flex flex-wrap items-center gap-3 border-t border-slate-200 pt-4 text-sm font-medium text-slate-600'>
                        <span className='rounded-full bg-slate-100 px-3 py-1.5'>{experience}</span>
                        <span className='rounded-full bg-blue-50 px-3 py-1.5 text-blue-800'>{rate}</span>
                    </div>

                    {/* if user is login move to book page else move to home page */}
                    <button
                        onClick={() => {
                            if (token) {
                                sessionStorage.setItem("selectedProviderId", adminId || "")
                                sessionStorage.setItem("selectedServiceName", service || "")
                                navigate("/book", { state: { adminId, service } })
                            } else {
                                navigate("/")
                            }
                        }}
                        className='primary-button px-5 py-3'
                    >
                        Book Now
                    </button>
            </div>
        </div>
    )
}

export default Service
