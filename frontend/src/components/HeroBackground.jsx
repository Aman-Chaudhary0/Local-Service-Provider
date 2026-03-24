import React from 'react'
import { assets } from '../assets/assets'

const HeroBackground = () => {

  //============================================================================================================================================================//
  return (
    <div className='w-full min-h-[420px] bg-cover bg-center md:min-h-[520px]'
      style={{ backgroundImage: `url(${assets.hero_background})` }}>
        <div className='section-shell py-16 md:py-24'>
        <h3 className='max-w-4xl text-3xl font-bold leading-tight text-blue-950 sm:text-4xl md:text-5xl'>Book trusted professionals near you for home, repair, and daily services.</h3>
        </div>

    </div>
  )
}

export default HeroBackground
