import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch, products = [] } = useContext(ShopContext);
    const location = useLocation();
    const [visible, setVisible] = useState(false);

    // Lọc sản phẩm dựa trên từ khóa tìm kiếm
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    // Sử dụng reduce để tính tổng số sản phẩm phù hợp
    const matchCount = filteredProducts.reduce((acc) => acc + 1, 0); // Đếm số lượng sản phẩm

    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true);
        } else {
            setVisible(false);
            setSearch(''); // Xóa tìm kiếm khi không ở trang collection
        }
    }, [location, setSearch]);

    return showSearch && visible ? (
        <div className='border-b bg-gray-50 text-center py-4'>
            {/* Thanh tìm kiếm */}
            <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='flex-1 outline-none bg-inherit text-sm'
                    type='text'
                    placeholder='Search'
                />
                <img src={assets.search_icon} className="w-4" alt="search" />
            </div>
            <img
                onClick={() => setShowSearch(false)}
                className="inline w-3 cursor-pointer"
                src={assets.cross_icon}
                alt="close"
            />

            {/* Hiển thị số lượng kết quả */}
            {search && (
                <p className='text-sm text-gray-600 mt-2'>
                    Tìm thấy {matchCount} sản phẩm phù hợp
                </p>
            )}

            {/* Hiển thị danh sách kết quả tìm kiếm với map */}
            {search && filteredProducts.length > 0 && (
                <ul className='mt-4 max-h-60 overflow-y-auto text-left'>
                    {filteredProducts.map((product, index) => (
                        <li
                            key={index}
                            className='px-4 py-2 border-b hover:bg-gray-100 cursor-pointer'
                        >
                            {product.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    ) : null;
};

export default SearchBar;