import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { toast } from 'react-toastify';

const Collection = () => {

    const { products, search, showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [sortType, setSortType] = useState('relavent');
    const [isLoading, setIsLoading] = useState(true);

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value))
        }
        else {
            setCategory(prev => [...prev, e.target.value])
        }
    }

    const applyFilter = () => {
        if (!products || products.length === 0) {
            setFilterProducts([]); // Đặt rỗng nhưng không thông báo
            return;
        }

        let productsCopy = products.slice();

        if (search && showSearch) {
            productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        }

        if (category.length > 0) {
            productsCopy = productsCopy.filter(item => category.includes(item.category));
        }

        setFilterProducts(productsCopy);

        if (productsCopy.length === 0 && !isLoading) {
            toast.info('Không có sản phẩm phù hợp.');
        }
    };

    const sortProduct = () => {
        let fpCopy = filterProducts.slice();

        switch (sortType) {
            case 'low-high':
                setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
                break;

            case 'high-low':
                setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
                break;

            default:
                applyFilter();
                break;
        }
    }

    useEffect(() => {
        applyFilter();
        setIsLoading(false); // Dữ liệu đã sẵn sàng sau lần đầu tiên
    }, [category, search, showSearch, products]);

    useEffect(() => {
        sortProduct();
    }, [sortType])

    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
            <div className='min-w-60'>

                <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>BỘ LỌC
                    <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} alt="" />
                </p>

                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>PHÂN LOẠI</p>

                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input className='w-3' type='checkbox' value={'Men'} onChange={toggleCategory} />Nam
                        </p>

                        <p className='flex gap-2'>
                            <input className='w-3' type='checkbox' value={'Women'} onChange={toggleCategory} />Nữ
                        </p>

                        <p className='flex gap-2'>
                            <input className='w-3' type='checkbox' value={'Kid'} onChange={toggleCategory} />Trẻ em
                        </p>
                    </div>
                </div>

            </div>

            {/*SORT PRODUCT */}
            <div className='flex-1'>
                <div className='flex justify-between text-base sm:text-2xl mb-4'>
                    <Title text1={'ALL '} text2={' COLLECTIONS'} />

                    <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
                        <option value='relavent'>Sắp xếp theo: Liên quan</option>
                        <option value='low-high'>Sắp xếp theo: Giá thấp - cao</option>
                        <option value='high-low'>Sắp xếp theo: Giá cao - thấp</option>
                    </select>
                </div>

                {/* MAP PRODUCT */}
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                    {
                        filterProducts.map((item, index) => (
                            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price.toLocaleString('vi-VN')} />
                        ))
                    }
                </div>
            </div>
        </div >
    )
}

export default Collection;
