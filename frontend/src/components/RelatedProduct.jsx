import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useEffect } from 'react';
import Title from './Title'
import ProductItem from './ProductItem';

const RelatedProduct = ({ category }) => {

    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();

            productsCopy = products.filter((item) => category === item.category);

            setRelated(productsCopy.slice(0, 5));

        }
    }, [products])

    return (
        <div className='my-24'>
            <div className='text-center text-3xl py-2'>
                <Title text1={'SẢN PHẨM '} text2={' LIÊN QUAN'}></Title>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {related.map((item, index) => (
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price.toLocaleString('vi-VN')} />
                ))}
            </div>

        </div>
    )
}

export default RelatedProduct
