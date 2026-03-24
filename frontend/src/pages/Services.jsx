import React, { useEffect, useRef, useState } from 'react'
import Service from '../components/Service'
import axios from 'axios'
import Search from '../components/Search'
import { getApiErrorMessage, normalizeApiResponse } from '../utils/api'

// debounce time
const SEARCH_DEBOUNCE_MS = 400

const Services = () => {
  const DEFAULT_LIMIT = 10

  // store services
  const [services, setServices] = useState([])
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState("newest")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  // abort old req and store new req controller
  const abortControllerRef = useRef(null)
  const hasLoadedOnceRef = useRef(false)

  // pagination data
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: DEFAULT_LIMIT,
    totalPages: 1,
  })

  // fetch api
  const fetchServices = async (searchTerm = "", pageNumber = 1, sortBy = "newest") => {

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
        params: {
          search: searchTerm,
          page: pageNumber,
          limit: DEFAULT_LIMIT,
          sort: sortBy,
        },
      })

      // only display UI of current active request
      if (abortControllerRef.current !== controller) {
        return
      }

      const apiResponse = normalizeApiResponse(res, "Services loaded successfully")

       // if api fetch unsuccessfull
      if (!apiResponse.ok) {
        setErrorMessage(apiResponse.message || "Unable to load services")
        setServices([])
        setPagination({
          total: 0,
          page: pageNumber,
          limit: DEFAULT_LIMIT,
          totalPages: 1,
        })
        return
      }

      setServices(Array.isArray(apiResponse.data) ? apiResponse.data : [])
      setPagination(apiResponse.meta || {
        total: 0,
        page: pageNumber,
        limit: DEFAULT_LIMIT,
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
      fetchServices(search, page, sort)
      return () => {
        abortControllerRef.current?.abort()
      }
    }

    // calling function when change in search, sort or page
    const timeoutId = setTimeout(() => {
      fetchServices(search, page, sort)
    }, SEARCH_DEBOUNCE_MS)

    // clear debounce time and cancel curr req
    return () => {
      clearTimeout(timeoutId)
      abortControllerRef.current?.abort()
    }
  }, [search, page, sort])



  
  //============================================================================================================================================================//
  return (
    <>
      <Search
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          setPage(1)
          setErrorMessage("")
        }}

        // sort providers
        sort={sort}
        onSortChange={(e) => {
          setSort(e.target.value)
          setPage(1)
          setErrorMessage("")
        }}
      />
      <div className='bg-slate-50 py-8'>
        <div className='section-shell space-y-6'>
          <div className='flex flex-col gap-2 md:flex-row md:items-end md:justify-between'>
            <div>
              <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>Results</p>
              <h3 className='text-3xl font-semibold tracking-tight text-slate-900'>Available providers</h3>
            </div>
            <p className='text-sm text-slate-500'>Showing page {pagination.page} of {pagination.totalPages}</p>
          </div>

        {isLoading && <p className='feedback-banner feedback-info'>Loading services...</p>}
        {!isLoading && errorMessage && <p className='feedback-banner feedback-error'>{errorMessage}</p>}
        {!isLoading && !errorMessage && services.length === 0 && <p className='feedback-banner feedback-warning'>No services found.</p>}

        <div className='space-y-4'>
          {services.map((item, index) => (
            <Service key={index} adminId={item.id} name={item.name} service={item.service} rate={item.rate} experience={item.experience} />
          ))}
        </div>

        <div className='flex flex-col items-center justify-center gap-4 pt-2 md:flex-row'>

          {/* btn for previos page */}
          <button
            type='button'
            onClick={() => {
              const prevPage = page - 1
              setPage(prevPage)
            }}
            disabled={page === 1 || isLoading}
            className='primary-button px-4 py-2'
          >
            Previous
          </button>

          <p className='text-sm font-medium text-slate-600'>Page {pagination.page} of {pagination.totalPages}</p>

          {/* btn for next page */}
          <button
            type='button'
            onClick={() => {
              const nextPage = page + 1
              setPage(nextPage)
            }}
            disabled={page === pagination.totalPages || isLoading}
            className='primary-button px-4 py-2'
          >
            Next
          </button>
        </div>
        </div>
      </div>
    </>
  )
}

export default Services
