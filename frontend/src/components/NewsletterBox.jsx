import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = () => {
        event.preventDefault();
    }

    return (
        <div className='text-center'>
            <p className='text-2xl font-medium text-gray-800'>Đăng ký & discount 20% </p>
            <p className='text-gray-400 mt-3'>
                Forever đơn giản chỉ là tiếng nói của niềm đam mê thời trang bất tận.</p>

            <form onSubmit={onSubmitHandler} className='w-full h-12 sm:w-1/2 flex items:center gap-3 mx-auto my-6 border pl-3'>
                <input className='w-full sm:flex-1 outline-none' type='email' placeholder='Nhập email của bạn' required></input>
                <button type='submit' className='w-40 bg-black text-white text-xs'>ĐĂNG KÝ</button>
            </form>
        </div>
    )
}

export default NewsletterBox
