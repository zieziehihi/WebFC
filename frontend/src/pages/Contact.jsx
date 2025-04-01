import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewLetterBox from '../components/NewsletterBox'

const Contact = () => {
    return (
        <div>

            <div className='text-center text-2xl pt-10 border-t'>
                <Title text1={'KẾT NỐI VỚI'} text2={' FOREVER'} />
            </div>

            <div className='my-10 text-start flex flex-col justify-center md:flex-row gap-10 mb-28'>
                <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
                <div className='flex flex-col justify-center items-start gap-6'>
                    <p className='font-semibold text-xl text-gray-600'>Cửa hàng: </p>
                    <p className='text-gray-500'>766 Võ Văn Kiệt, <br />phường 1, quận 5,<br />Thành phố Hồ Chí Minh, Việt Nam.</p>
                    <p className='text-gray-500'>Tel: (+84) 968-968-968 <br /> Email: meowmeow@gmail.com</p>
                    <p className='font-semibold text-xl text-gray-600 mt-2 mb-[-2px]'>Làm việc với Forever</p>
                    <p className='text-gray-500'>Tìm hiểu thêm về việc làm tạ Forever.</p>
                    <p className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Tìm hiểu ngay</p>
                </div>
            </div>

            <NewLetterBox />

        </div>
    )
}

export default Contact
