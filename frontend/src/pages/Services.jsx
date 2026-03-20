import React, { useEffect, useState } from 'react'
import Service from '../components/Service'
import axios from 'axios'
import Search from '../components/Search'

const Services = () => {

  // store services
  const [services, setServices] = useState([])
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  // pagination data
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  })

  // fetch api
  const fetchServices = async (searchTerm = "", pageNumber = 1) => {
      setIsLoading(true)
      setErrorMessage("")

      try {
      const res = await axios.get("http://localhost:3000/api/get/providers", {
        withCredentials: true,
        params: { search: searchTerm, page: pageNumber, limit: 10 },
      })

      setServices(res.data.data)
      setPagination(res.data.pagination)
      } catch (error) {
        setErrorMessage(error.response?.data?.message || "Unable to load services")
        setServices([])
        
      } finally {
        setIsLoading(false)
      }
  }

  useEffect(() => {
    fetchServices(search, page)
  }, [])

  
  // used when search btn clicked in search bar shift to page 1
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setPage(1)
    await fetchServices(search, 1)
  }

  return (
    <>
    <Search
      value={search}
      onChange={(e) => {
        setSearch(e.target.value)
        setErrorMessage("")
      }}
      onSubmit={handleSearchSubmit}
    />
    <div className='bg-neutral-200 py-4 h-auto '>
      {isLoading && <p className='mx-auto mb-4 w-[80%] rounded bg-blue-100 px-4 py-3 text-blue-700'>Loading services...</p>}
      {!isLoading && errorMessage && <p className='mx-auto mb-4 w-[80%] rounded bg-red-100 px-4 py-3 text-red-700'>{errorMessage}</p>}
      {!isLoading && !errorMessage && services.length === 0 && <p className='mx-auto mb-4 w-[80%] rounded bg-yellow-100 px-4 py-3 text-yellow-800'>No services found.</p>}

      {services.map((item, index) => (
        <Service key={index} adminId={item.id} name={item.name} service={item.service} rate={item.rate} experience={item.experience} />
      ))}

      <div className='flex justify-center items-center gap-4 py-6'>

        {/* btn for previos page */}
        <button
          type='button'
          onClick={async () => {
            const prevPage = page - 1
            setPage(prevPage)
            await fetchServices(search, prevPage)
          }}
          disabled={page === 1 || isLoading}
          className='px-4 py-2 bg-blue-900 text-white rounded disabled:bg-gray-400'
        >
          Previous
        </button>

        <p>Page {pagination.page} of {pagination.totalPages}</p>

          {/* btn for next page */}
        <button
          type='button'
          onClick={async () => {
            const nextPage = page + 1
            setPage(nextPage)
            await fetchServices(search, nextPage)
          }}
          disabled={page === pagination.totalPages || isLoading}
          className='px-4 py-2 bg-blue-900 text-white rounded disabled:bg-gray-400'
        >
          Next
        </button>
      </div>
    </div>
    </>
  )
}

export default Services
