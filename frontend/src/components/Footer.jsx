import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div>
            <div className='w-full flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-30 text:sm'>
                <div>
                    <img src={assets.logo} className="mb-5 w-32" alt="" />
                    <p className='w-full md:w-3/4 text-justify text-gray-600'>
                        Forever đơn giản chỉ là tiếng nói của niềm đam mê thời trang bất tận.
                        Forever không chỉ là một thương hiệu, mà còn là biểu tượng của sự sáng tạo và phong cách không giới hạn.
                        Mỗi thiết kế đều mang trong mình hơi thở của thời đại, tôn vinh vẻ đẹp và cá tính của mỗi một khách hàng.</p>
                </div>

                <div>
                    <p className='text-xl text-left font-medium mb-5'>DOANH NGHIỆP</p>

                    <ul className='flex flex-col gap-1 text-left text-gray-600'>
                        <li>Trang chủ</li>
                        <li>Giới thiệu</li>
                        <li>Dịch vụ giao hàng</li>
                        <li>Chính sách riêng tư</li>
                    </ul>
                </div>

                <div>
                    <p className='text-xl text-left font-medium mb-5'>LIÊN HỆ</p>

                    <ul className='flex flex-col gap-1 text-left text-gray-600'>
                        <li>(+84) 968-968-968</li>
                        <li>meowmeow@gmail.com</li>
                    </ul>
                </div>
            </div>

            <div>
                <hr className='w-full'></hr>
                <p className='mt-5 text-sm text-center'>Copyright 2025@ forever.com - All Right reserved.</p>
            </div>
        </div>
    )
}

export default Footer
