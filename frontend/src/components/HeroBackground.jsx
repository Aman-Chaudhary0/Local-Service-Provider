import React from 'react'
import { assets } from '../assets/assets'

const HeroBackground = () => {

  //============================================================================================================================================================//
  return (
    <div className='w-full h-120 bg-cover'
      style={{ backgroundImage: `url(${assets.hero_background})` }}>

        <h3 className='px-10 py-20 text-5xl font-bold text-blue-950'>Book trusted professionals near you for home, repair, and daily services.</h3>

    </div>
  )
}

export default HeroBackground