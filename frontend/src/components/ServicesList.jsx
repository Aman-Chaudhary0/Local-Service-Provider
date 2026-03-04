import React from 'react'
import { serviceProviders } from '../assets/assets'
import Service from './Service'

const Services = () => {
  return (
    <div className='bg-neutral-200 py-4 h-105 overflow-y-scroll '>

      {serviceProviders.map((item, index) => {
        
        return <Service key={index} name={item.name} service={item.service} rating={item.rating} rate={item.rate} experience={item.experience} image={item.image} />
      })}

    </div>
  )
}

export default Services