import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

// get token
const ProtectedRoute = ({ tokenKey, redirectTo = "/" }) => {
  const token = localStorage.getItem(tokenKey)

  // if not login move to login page
  if (!token) {
    return <Navigate to={redirectTo} replace />
  }

  // show child components
  return <Outlet />
}

export default ProtectedRoute
