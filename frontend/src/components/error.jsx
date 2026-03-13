import React from 'react'
import { Link } from 'react-router-dom'

// 404 for invalid routes
const Error = () => {
  return (
    <div className='min-h-[60vh] flex items-center justify-center px-6 py-12'>
      <div className='text-center max-w-lg'>
        <p className='text-sm font-semibold text-gray-500 tracking-widest'>404</p>
        <h1 className='mt-2 text-3xl font-bold text-gray-900'>Page not found</h1>
        <p className='mt-3 text-gray-600'>
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <div className='mt-6'>
          <Link
            to="/"
            className='inline-block bg-blue-700 text-white px-5 py-2 rounded-lg'
          >
            Go to home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Error
