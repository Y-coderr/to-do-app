"use client"

import { createContext, useState, useEffect } from "react"
import axios from "axios"


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load user on initial render
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token")

      if (!token) {
        setLoading(false)
        return
      }

      try {
        //default headers for all axios requests
        axios.defaults.headers.common["x-auth-token"] = token

        const res = await axios.get("http://localhost:5000/api/auth/user")

        setUser(res.data)
        setIsAuthenticated(true)
      } catch (err) {
        localStorage.removeItem("token")
        setError(err.response?.data?.msg || "Authentication failed")
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  // Register user
  const register = async (formData) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formData)

      localStorage.setItem("token", res.data.token)
      axios.defaults.headers.common["x-auth-token"] = res.data.token

      // Load user data
      const userRes = await axios.get("http://localhost:5000/api/auth/user")

      setUser(userRes.data)
      setIsAuthenticated(true)
      setError(null)

      return true
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed")
      return false
    }
  }

  // Login user
  const login = async (formData) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData)

      localStorage.setItem("token", res.data.token)
      axios.defaults.headers.common["x-auth-token"] = res.data.token

      setUser(res.data.user)
      setIsAuthenticated(true)
      setError(null)

      return true
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed")
      return false
    }
  }

  // Logout user
  const logout = () => {
    localStorage.removeItem("token")
    delete axios.defaults.headers.common["x-auth-token"]

    setUser(null)
    setIsAuthenticated(false)
  }

  // Clear errors
  const clearError = () => {
    setError(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

