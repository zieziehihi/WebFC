import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {

    const [visible, setVisible] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const { setShowSearch, getCartCount, token, setToken, navigate, setCartItems } = useContext(ShopContext);
    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})

    }

    const handleMouseEnter = () => {
        if (timeoutId) {
            clearTimeout(timeoutId); // Hủy timeout đóng menu nếu đang có
        }
        setIsMenuOpen(true);
    };

    const handleMouseLeave = () => {
        const id = setTimeout(() => {
            setIsMenuOpen(false); // Đóng menu sau 200ms
        }, 200);
        setTimeoutId(id);
    };

    return (
        <div className="w-full h-15 flex items-center justify-between py-5 font-medium mb-4">

            <Link to='/'> <img src={assets.logo} className="w-36" alt="Logo" /></Link>

            <ul className="h-7 flex gap-5 text-sm text-gray-700">
                <NavLink to="/" className="flex flex-col items-center gap-1">
                    <p>TRANG CHỦ</p>
                    <hr className="w-20 border-none h-[1.5px] bg-gray-700" />
                </NavLink>
                <NavLink to="/collection" className="flex flex-col items-center gap-1">
                    <p>Bộ sưu tập</p>
                    <hr className="w-20 border-none h-[1.5px] bg-gray-700" />
                </NavLink>
                <NavLink to="/about" className="flex flex-col items-center gap-1">
                    <p>Giới thiệu</p>
                    <hr className="w-20 border-none h-[1.5px] bg-gray-700" />
                </NavLink>
                <NavLink to="/contact" className="flex flex-col items-center gap-1">
                    <p>Liên hệ</p>
                    <hr className="w-20 border-none h-[1.5px] bg-gray-700" />
                </NavLink>
            </ul>

            <div className="flex items-center gap-6">

                <img onClick={() => setShowSearch(true)} src={assets.search_icon} className="w-5 cursor-pointer" alt="" />

                <div className="group relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} className="w-5 min-w-5 cursor-pointer" alt="" />

                    {/* DROPDOWN MENU */}
                    {token && isMenuOpen && (
                        <div className="flex flex-col absolute right-0 top-full mt-1 w-36 py-3 px-5 bg-slate-100 text-gray-500 shadow-lg rounded-md z-10">
                            <p className="cursor-pointer hover:text-black py-1" onClick={() => navigate('/profile')} >Hồ sơ</p>
                            <p className="cursor-pointer hover:text-black py-1" onClick={() => navigate('/orders')}>Đơn hàng</p>
                            <p className="cursor-pointer hover:text-black py-1" onClick={logout}>Đăng xuất</p>
                        </div>
                    )}
                </div>

                {/* CART ICON */}
                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
                    <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text[-8px]">
                        {getCartCount()}</p>
                </Link>

                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer' alt="" />

            </div>

            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className="flex flex-col text-gray-600">
                    <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3">
                        <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
                    </div>

                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>TRANG CHỦ</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>Bộ sưu tập</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>Giới thiệu</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>Liên hệ</NavLink>
                </div>
            </div>

        </div >
    );
};

export default Navbar;
