import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {

    return (
        <div className='w-[15%] min-h-screen border-r-1'>

            <p className='mt-7 text-center font-medium'>QUẢN LÝ</p>

            <div className='flex flex-col gap-4 pt-6 pl-[10%] text-[15px]'>
                <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to='/add'>
                    <img className='w-5 h-5' src={assets.add_icon} alt='' />
                    <p className='hidden md:block'>Thêm sản phẩm</p>
                </NavLink>

                <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to='/list'>
                    <img className='w-5 h-5' src={assets.add_icon} alt='' />
                    <p className='hidden md:block'>Sản phẩm</p>
                </NavLink>

                <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to='/orders'>
                    <img className='w-5 h-5' src={assets.add_icon} alt='' />
                    <p className='hidden md:block'>Đơn hàng</p>
                </NavLink>

            </div>
        </div>
    )
}

export default Sidebar
