import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';

const Product = () => {

    const { productId } = useParams();
    const { products, currency, addToCart } = useContext(ShopContext);
    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');


    const fetchProductData = async () => {
        products.map((item) => {
            if (item._id === productId) {
                setProductData(item)
                setImage(item.image[0])
                return null;
            }
        })
    }

    useEffect(() => {
        fetchProductData();
    }, [productId, products]);

    return productData ? (
        <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
            <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

                {/* PRODUCT IMAGE */}
                <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                    <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                        {
                            productData.image.map((item, index) => (
                                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt='' />
                            ))
                        }
                    </div>

                    <div className='w-full sm:w-[80%]'>
                        <img src={image} className='w-full h-auto' alt='' />
                    </div>
                </div>

                {/* PRODUCT IN4 */}
                <div className='flex-1'>
                    <h1 className='font-medium text-left text-2xl mt-2'>{productData.name}</h1>
                    <div className='flex items-center gap-1 mt-2'>
                        <img src={assets.star_icon} className='w-3 5' alt='' />
                        <img src={assets.star_icon} className='w-3 5' alt='' />
                        <img src={assets.star_icon} className='w-3 5' alt='' />
                        <img src={assets.star_icon} className='w-3 5' alt='' />
                        <img src={assets.star_dull_icon} className='w-3 5' alt='' />
                        <p>(122)</p>
                    </div>

                    <p className='mt-5 text-left text-3xl font-medium'>{productData.price.toLocaleString('vi-VN')} {currency}</p>
                    <p className='mt-5 text-justify text-gray-500 md:w-4/5'>{productData.description}</p>

                    <div className='flex gap-2'>
                        {productData.sizes.map((item, index) => (
                            <button onClick={() => setSize(item)} className={`border mt-5 py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>

                        ))}
                    </div>

                    {/* ADD TO CART */}
                    <button onClick={() => addToCart(productData._id, size)} className='w-40 bg-black mr-78 mt-6 text-white px-8 py-3 text-sm active:bg-gray-700'>THÊM VÀO GIỎ</button>
                    <hr className='mt-8 sm:w-4/5'></hr>

                    <div className='text-sm text-left text-gray-500 mt-5 flex flex-col gap-1'>
                        <p>Sản phẩm chính hãng 100%.</p>
                        <p>Sản phẩm này có thể thanh toán khi nhận hàng.</p>
                        <p>Chính sách đổi trả dễ dàng trong vòng 7 ngày.</p>
                    </div>
                </div>
            </div>

            {/* DESCRIPTION & REVIEW */}
            <div className='mt-20'>
                <div className='flex'>
                    <b className='border px-5 py-3 text-sm'>Mô tả</b>
                    <b className='border px-5 py-3 text-sm'>Đánh giá (122)</b>
                </div>

                <div className='flex flex-col gap-4 border px-6 py-6 text-justify text-sm text-gray-500'>
                    <p>Chiếc áo thun được làm từ chất liệu cotton cao cấp, mềm mại và thoáng khí, giúp bạn luôn cảm thấy thoải mái dù mặc trong thời gian dài.
                        Thiết kế đơn giản nhưng tinh tế với cổ tròn và tay ngắn, dễ dàng kết hợp với quần jeans, kaki hay chân váy để tạo nên nhiều phong cách khác nhau.
                        Form áo được cắt may chuẩn, giúp tôn dáng người mặc, đồng thời đường may chắc chắn đảm bảo độ bền đẹp ngay cả sau nhiều lần giặt.
                        Màu sắc trẻ trung, không bị phai theo thời gian, phù hợp cho mọi độ tuổi và có thể diện trong nhiều hoàn cảnh, từ đi chơi, dạo phố đến hoạt động thể thao nhẹ nhàng.
                    </p>

                    <p>Chất liệu co giãn nhẹ giúp áo luôn vừa vặn với cơ thể mà không gây cảm giác bó sát hay khó chịu khi vận động.
                        Là lựa chọn lý tưởng cho những ai yêu thích sự đơn giản nhưng vẫn muốn giữ được phong cách thời trang hiện đại và năng động.
                    </p>
                </div>
            </div>

            {/* DISPLAY RELATED PRODUCT */}
            <RelatedProduct category={productData.category} />

        </div>
    ) : <div className='opacity-0'></div>
}

export default Product
