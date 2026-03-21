import React, { useEffect, useState } from 'react'
import AdminService from './AdminService'
import axios from 'axios'
import { getApiData, getApiErrorMessage } from '../utils/api'


// services offered by provider
const AdminServices = ({ setIsServiceAdd }) => {

  const [serviceList, setServiceList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  // fetch data
  useEffect(() => {
    (async () => {
      setIsLoading(true)
      setErrorMessage("")

      try {
        const res = await axios.get("http://localhost:3000/api/get/adminservices", { withCredentials: true })
        setServiceList(getApiData(res) || [])

      } catch (error) {
        setErrorMessage(getApiErrorMessage(error, "Unable to load services"))
        setServiceList([])
        
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])


  //============================================================================================================================================================//
  return (
    <div className=' my-10 bg-indigo-50'>


        <h2 className='font-semibold text-3xl text-blue-950 mx-8 mb-3.5 mt-7'>Manage My Services</h2>

        <hr className='mx-8 text-gray-400'/>

        <div className='rounded-xl mx-8 my-3 bg-white max-h-64 overflow-y-auto'>
          {isLoading && <p className='px-8 py-4 text-blue-700'>Loading services...</p>}
          {!isLoading && errorMessage && <p className='px-8 py-4 text-red-600'>{errorMessage}</p>}
          {!isLoading && !errorMessage && serviceList.length === 0 && <p className='px-8 py-4 text-yellow-700'>No services added yet.</p>}
          {serviceList.map((item, index) => (
            <AdminService key={item._id ?? index} serviceName={item.serviceName} />
          ))}
        </div>

        <button onClick={() => setIsServiceAdd(false)} className='bg-blue-600 text-white mx-8 my-4 w-1/4 py-3.5 rounded text-xl'>Add New Service</button>

      
    </div>
  )
}

export default AdminServices
