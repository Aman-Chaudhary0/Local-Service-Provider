import React, { useEffect, useRef, useState } from 'react'
import Service from '../components/Service'
import axios from 'axios'
import Search from '../components/Search'
import { getApiData, getApiErrorMessage } from '../utils/api'

// debounce time
const SEARCH_DEBOUNCE_MS = 400

const Services = () => {

  // store services
  const [services, setServices] = useState([])
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  // abort old req and store new req controller
  const abortControllerRef = useRef(null)
  const hasLoadedOnceRef = useRef(false)

  // pagination data
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  })

  // fetch api
  const fetchServices = async (searchTerm = "", pageNumber = 1) => {

    // remove current store value , intialise abortcontroller 
    abortControllerRef.current?.abort()
    const controller = new AbortController()
    abortControllerRef.current = controller
    setIsLoading(true)
    setErrorMessage("")

    try {
      const res = await axios.get("http://localhost:3000/api/get/providers", {
        withCredentials: true,

        // connect fetch with controller
        signal: controller.signal,
        params: { search: searchTerm, page: pageNumber, limit: 10 },
      })

      // only display UI of current active request
      if (abortControllerRef.current !== controller) {
        return
      }

      setServices(getApiData(res) || [])
      setPagination(res.data.meta || {
        total: 0,
        page: pageNumber,
        limit: 10,
        totalPages: 1,
      })
    } catch (error) {
      if (axios.isCancel(error) || error.code === "ERR_CANCELED") {
        return
      }

      setErrorMessage(getApiErrorMessage(error, "Unable to load services"))
      setServices([])
    } finally {
      if (abortControllerRef.current === controller) {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {

    // if page not load once data fetch immediately
    if (!hasLoadedOnceRef.current) {
      hasLoadedOnceRef.current = true
      fetchServices(search, page)
      return () => {
        abortControllerRef.current?.abort()
      }
    }

    // calling function when change in search or page
    const timeoutId = setTimeout(() => {
      fetchServices(search, page)
    }, SEARCH_DEBOUNCE_MS)

    // clear debounce time and cancel curr req
    return () => {
      clearTimeout(timeoutId)
      abortControllerRef.current?.abort()
    }
  }, [search, page])



  
  //============================================================================================================================================================//
  return (
    <>
      <Search
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          setErrorMessage("")
        }}
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
            onClick={() => {
              const prevPage = page - 1
              setPage(prevPage)
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
            onClick={() => {
              const nextPage = page + 1
              setPage(nextPage)
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
