import React from 'react'
import { Link } from 'react-router-dom'
import img from "../assets/iFitness.png"
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const {user}=useAuthContext()
  return (
    <nav className='bg-black text-white shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <Link to="/" className="flex items-center">
          <img src={img} alt="ifitness_logo" className="h-[60px] w-auto" />
        </Link>
        <div>
          <Link to="/login">Login</Link>
          <Link to="/logout">Logout</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar