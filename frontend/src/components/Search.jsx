import React from 'react'
import { assets } from '../assets/assets'

const Search = ({ value, onChange }) => {


  //============================================================================================================================================================//
  return (
    <div className='bg-slate-300 h-40 relative pl-3 border-b-2 border-gray-400'>
        <h2 className='py-5 font-bold text-4xl text-gray-800 max-md:text-3xl'>Find Local Service Providers Your Area</h2>

        <div className='bg-white flex absolute bottom-1 rounded-t w-[80%] h-13 items-center '> 
            
            <img className='w-6 h-6 mx-3' src={assets.search_icon} alt="" />
            <input
              className='w-full outline-none'
              type="text"
              placeholder='Search for a service...'
              value={value}
              onChange={onChange}
            />
        </div>
    </div>
  )
}

export default Search
