import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ tokenKey, redirectTo = "/" }) => {
  const token = localStorage.getItem(tokenKey)

  if (!token) {
    return <Navigate to={redirectTo} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
