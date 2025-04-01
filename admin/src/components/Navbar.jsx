import React from 'react'
import { assets } from '../assets/assets'
import { Link } from "react-router-dom";

const Navbar = ({ setToken }) => {
    return (
        <div className='h-20 flex items-center py-2 px-[4%] justify-between'>
            <Link to='/'> <img className='w-40 mb-4 mt-2' src={assets.logo} alt='' /></Link>
            <button onClick={() => setToken('')} className='bg-black text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Log out</button>
        </div>


    )
}

export default Navbar
