import React from 'react'



const AdminService = ({serviceName}) => {
  return (
    <div >
        <p className='text-2xl font-medium px-8 py-3.5'>{serviceName}</p>
        <hr className='mx-8 text-neutral-400' />
    </div>
  )
}

export default AdminService