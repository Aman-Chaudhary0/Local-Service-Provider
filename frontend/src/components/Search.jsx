import React from 'react'
import { assets } from '../assets/assets'

const Search = () => {
  return (
    <div className='bg-slate-300 h-40 relative pl-3 border-b-2 border-gray-400'>
        <h2 className='py-5 font-bold text-4xl text-gray-800 max-md:text-3xl'>Find Local Service Providers Your Area</h2>

        <div className='bg-white flex absolute bottom-1 rounded-t w-[80%] h-13 items-center '> 
            
            <img className='w-6 h-6 mx-3' src={assets.search_icon} alt="" />
            <input className='w-full outline-none' type="text" placeholder='Search for a service...' />
            <button className='text-white bg-blue-500 rounded px-2 py-1 mx-2 cursor-pointer outline-none border border-gray-400'>Search</button>
            
        </div>
    </div>
  )
}

export default Search