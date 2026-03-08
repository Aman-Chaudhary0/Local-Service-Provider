import React, { useEffect, useState } from 'react'
import Service from './Service'
import axios from 'axios'

const Services = () => {

  // store services
  const [services, setServices] = useState([])

  useEffect(() => {

    // function to fetch data
    const fetchServices = async () => {
      const res = await axios.get("http://localhost:3000/api/get/providers")

      // first it map data and then flat it || which flat username and serviceOffered objects
      const list = res.data.info.flatMap((provider) =>

        // it map on services objects of a particular provider
        provider.servicesOffered.map((item) => ({
          name: provider.username,
          service: item.serviceName,
          rate: item.charge,
          experience: item.experience,
        }))
      )
      setServices(list)
    }

    fetchServices()
  }, [])

  return (
    <div className='bg-neutral-200 py-4 h-105 overflow-y-scroll '>
      {services.map((item, index) => (
        <Service key={index} name={item.name} service={item.service}  rate={item.rate} experience={item.experience} />
      ))}
    </div>
  )
}

export default Services
