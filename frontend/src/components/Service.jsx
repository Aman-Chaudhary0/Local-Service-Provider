import React from 'react'
import { assets } from '../assets/assets'


// gaining data using props
const Service = ({ name, service, rating, rate, experience, image }) => {
    return (
        <div className='bg-white flex w-[80%] max-md:w-[90%] mx-auto my-2.5 justify-between items-center rounded max-md:flex-col py-6'>
            <img className='w-30 h-30 p-2' src={image} alt="" />

            <div className='flex-1 ml-4'>

                <div className='flex justify-between mb-2'>
                    <div>
                        <h2 className='text-xl font-semibold '>{name} </h2>
                        <p className='text-gray-500'>{service}</p>
                    </div>

                    <p className='px-3'>{rating}⭐⭐⭐⭐⭐</p>
                </div>

                <hr className='text-gray-400' />

                <div className='flex justify-between items-center'>

                    <div className='flex gap-4 text-gray-500 '>
                        <p>{experience}</p>
                        <p>{rate}</p>
                    </div>

                    <button className='px-4 py-2 mx-3 bg-blue-900 text-white rounded'>Book Now</button>
                </div>
            </div>
        </div>
    )
}

export default Service