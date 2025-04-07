"use client"

import { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { email, password } = formData
  const { login, isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect if authenticated
    if (isAuthenticated) {
      navigate("/dashboard")
    }
  }, [isAuthenticated, navigate])

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const success = await login({
      email,
      password,
    })

    if (success) {
      navigate("/dashboard")
    }
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required />
        </div>
        <input type="submit" value="Login" className="btn btn-block" />
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  )
}

export default Login

