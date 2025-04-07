"use client"
// creating header
import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

const Header = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext)

  const onLogout = () => {
    logout()
  }

  const authLinks = (
    <ul>
      {user && <li>Hello, {user.username}</li>}
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <a onClick={onLogout} href="#!">
          Logout
        </a>
      </li>
    </ul>
  )

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  )

  return (
    <header className="header">
      <h1>
        <Link to="/">Todo App</Link>
      </h1>
      <nav>{isAuthenticated ? authLinks : guestLinks}</nav>
    </header>
  )
}

export default Header

