"use client"

import { useContext } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { AuthContext } from "./context/AuthContext"
import { TodoProvider } from "./context/TodoContext"

// Components
import Header from "./components/layout/Header"
import Alert from "./components/layout/Alert"

// Pages
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import NotFound from "./pages/NotFound"

// Private route component for authentication and all
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext)

  if (loading) return <div>Loading...</div>

  return isAuthenticated ? children : <Navigate to="/login" />
}

const App = () => {
  const { error, clearError } = useContext(AuthContext)

  return (
    <>
      <Header />
      <div className="container">
        {error && <Alert message={error} type="danger" onClose={clearError} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <TodoProvider>
                  <Dashboard />
                </TodoProvider>
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}

export default App

