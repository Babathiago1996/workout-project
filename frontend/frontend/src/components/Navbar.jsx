import React from 'react'
import { Link } from 'react-router-dom'
import img from "../assets/iFitness.png"

const Navbar = () => {
  return (
    <nav className='bg-black text-white shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <Link to="/" className="flex items-center">
          <img src={img} alt="ifitness_logo" className="h-[60px] w-auto" />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar