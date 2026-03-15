import React, { useEffect, useState } from 'react'
import Service from '../components/Service'
import axios from 'axios'
import Search from '../components/Search'

const Services = () => {

  // store services
  const [services, setServices] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {


    // used normally when search box is not used
    const fetchServices = async (searchTerm = "") => {
      const res = await axios.get("http://localhost:3000/api/get/providers", {
        withCredentials: true,
        params: { search: searchTerm },
      })

      // first it map data and then flat it || which flat username and serviceOffered objects
      const list = res.data.info.flatMap((provider) =>

        // it map on services objects of a particular provider
        provider.servicesOffered.map((item) => ({
          id: provider._id,
          name: provider.username,
          service: item.serviceName,
          rate: item.charge,
          experience: item.experience,
        }))
      )
      setServices(list)
    }

    fetchServices("")
  }, [])

  
  // used when search btn clicked in search bar
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.get("http://localhost:3000/api/get/providers", {
      withCredentials: true,
      params: { search },
    })

    const list = res.data.info.flatMap((provider) =>
      provider.servicesOffered.map((item) => ({
        id: provider._id,
        name: provider.username,
        service: item.serviceName,
        rate: item.charge,
        experience: item.experience,
      }))
    )
    setServices(list)
  }

  return (
    <>
    <Search
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onSubmit={handleSearchSubmit}
    />
    <div className='bg-neutral-200 py-4 h-auto '>
      {services.map((item, index) => (
        <Service key={index} adminId={item.id} name={item.name} service={item.service} rate={item.rate} experience={item.experience} />
      ))}
    </div>
    </>
  )
}

export default Services
