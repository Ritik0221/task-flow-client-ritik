import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/layout.css'

export default function Navbar() {

  const { user, logout } = useAuth()
  const nav = useNavigate()
  const location = useLocation()   // <-- detects current route

  const handleLogout = () => {
    logout()
    nav('/login')
  }

  
  const handleSearch = (e) => {
  const key = e.target.value;
  nav(`/tasks?search=${key}`);
}

  return (
    <nav className="nav">

      <div className="nav-left">
        <Link to="/" className="brand">TaskFlow</Link>



        {/* search bar only for tasks route */}

        {location.pathname === "/tasks" ? (
          <input 
            type="search" 
            className='nav-search'
            size={20} 
            placeholder="search 🔍" 
            onChange={handleSearch}
          />
        ) : null}
      </div>

      <div className="nav-right">
        {user ? (
          <>
            <span className="nav-user">{user.name}</span>
            <Link to="/tasks" className="nav-link">Tasks</Link>
            <button className="btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </div>

    </nav>
  )
}
