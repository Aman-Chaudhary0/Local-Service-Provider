import React from 'react'
import { assets } from '../assets/assets'

const Search = ({ value, onChange, sort, onSortChange }) => {


  //============================================================================================================================================================//
  return (
    <div className=' border-slate-200'>
      <div className='section-shell py-10'>
        <div className='max-w-3xl space-y-3'>
          <p className='text-sm font-semibold uppercase tracking-[0.24em] text-blue-700'>Browse Services</p>
          <h2 className='text-4xl font-semibold tracking-tight text-slate-900 max-md:text-3xl'>Find local service providers in your area</h2>
          <p className='text-base text-slate-600'>Search by service, refine the order, and book the provider that fits your schedule.</p>
        </div>

        <div className='surface-card mt-8 flex flex-col gap-3 p-4 md:flex-row md:items-center'> 
            
            <div className='flex min-w-0 flex-1 items-center gap-3 rounded-2xl border-2 border-blue-200 bg-slate-50 px-4 py-3'>
              <img className='h-5 w-5' src={assets.search_icon} alt="" />
              <input
              className='min-w-0 flex-1 bg-transparent text-base text-slate-800 outline-none placeholder:text-slate-400'
              type="text"
              placeholder='Search for a service...'
              value={value}
              onChange={onChange}
            />
            </div>

            {/* Sort providers */}
            <select
              className='rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-800 outline-none md:w-56 md:flex-none'
              value={sort}
              onChange={onSortChange}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="service_asc">Service A-Z</option>
              <option value="service_desc">Service Z-A</option>
            </select>
        </div>
      </div>
    </div>
  )
}

export default Search
