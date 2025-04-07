"use client"

import { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  })
  const [formError, setFormError] = useState("")

  const { username, email, password, password2 } = formData
  const { register, isAuthenticated } = useContext(AuthContext)
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

    // Validate form
    if (password !== password2) {
      setFormError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setFormError("Password must be at least 6 characters")
      return
    }

    setFormError("")

    // Register user
    const success = await register({
      username,
      email,
      password,
    })

    if (success) {
      navigate("/dashboard")
    }
  }

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {formError && <div className="alert alert-danger">{formError}</div>}
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" value={username} onChange={onChange} required />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required minLength="6" />
        </div>
        <div className="form-control">
          <label htmlFor="password2">Confirm Password</label>
          <input type="password" name="password2" value={password2} onChange={onChange} required minLength="6" />
        </div>
        <input type="submit" value="Register" className="btn btn-block" />
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  )
}

export default Register

