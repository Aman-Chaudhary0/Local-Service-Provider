import React, { useEffect, useState } from 'react'
import AdminService from './AdminService'
import axios from 'axios'


// services offered by provider
const AdminServices = ({ setIsServiceAdd }) => {

  const [serviceList, setServiceList] = useState([])

  // fetch data
  useEffect(() => {
    (async () => {
      const res = await axios.get("http://localhost:3000/api/get/adminservices", { withCredentials: true })
      setServiceList(res.data.services)
    })()
  }, [])

  return (
    <div className=' my-10 bg-indigo-50'>


        <h2 className='font-semibold text-3xl text-blue-950 mx-8 mb-3.5 mt-7'>Manage My Services</h2>

        <hr className='mx-8 text-gray-400'/>

        <div className='rounded-xl mx-8 my-3 bg-white max-h-64 overflow-y-auto'>
          {serviceList.map((item, index) => (
            <AdminService key={item._id ?? index} serviceName={item.serviceName} />
          ))}
        </div>

        <button onClick={() => setIsServiceAdd(false)} className='bg-blue-600 text-white mx-8 my-4 w-1/4 py-3.5 rounded text-xl'>Add New Service</button>

      
    </div>
  )
}

export default AdminServices
