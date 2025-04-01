import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {
    const { delivery_fee, getCartAmount, currency } = useContext(ShopContext);

    return (
        <div className='w-80 ml-auto'>
            <div className='text-lg'>
                <Title text1={''} text2={'TẠM TÍNH'}></Title>
            </div>

            <div className='flex justify-between'>
                <p>Tổng số tiền</p>
                <p> {getCartAmount().toLocaleString('vi-VN')} {currency}</p>
            </div>

            <hr />

            <div className='mt-2 flex justify-between'>
                <p>Phí ship</p>
                <p>{delivery_fee.toLocaleString('vi-VN')} {currency}</p>
            </div>

            <hr />
            <div className='mt-2 flex justify-between font-bold'>
                <p>Tổng thanh toán</p>
                <p> {getCartAmount() === 0 ? '0' : (getCartAmount() + delivery_fee).toLocaleString('vi-VN')} {currency}</p>
            </div>
        </div>
    )
}

export default CartTotal
