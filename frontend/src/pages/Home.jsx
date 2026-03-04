import React from 'react'
import Search from '../components/Search'
import Services from '../components/ServicesList'
import Procedure from '../components/Procedure'

const Home = () => {
  return (
    <div>
      <Search />
      <Services />
      <Procedure />
    </div>
  )
}

export default Home