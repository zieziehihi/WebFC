import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {

    const { backendUrl, token, currency, navigate } = useContext(ShopContext)
    const [orderData, setOrderData] = useState([])

    const loadOrderData = async () => {
        try {

            if (!token) {
                return null
            }

            const response = await axios.post(`${backendUrl}/api/order/userorders`, {}, { headers: { token } });

            if (response.data.success) {
                let allOrdersItem = []
                response.data.orders.map((order) => {
                    order.items.map((item) => {
                        item['status'] = order.status
                        item['payment'] = order.payment
                        item['paymentMethod'] = order.paymentMethod
                        item['date'] = order.date
                        allOrdersItem.push(item)
                    })
                })

                setOrderData(allOrdersItem.reverse())

            }

        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
        if (token) {
            loadOrderData();
        }
    }, [token]);


    return (
        <div className='border-t pt-16'>
            <div className='text-2xl mb-6'>
                <Title text1={'DANH SÁCH '} text2={'ĐƠN HÀNG'}></Title>
            </div>

            <div>
                {
                    orderData.map((item, index) => (
                        < div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                            <div className='flex items-start gap-6 text-sm'>

                                <img src={item.image[0]} className='w- sm:w-20' alt='' />

                                <div>
                                    <p className='text-justify sm:text-base font-medium'>{item.name}</p>

                                    <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                                        <p className='text-md'>{item.price.toLocaleString('vi-VN')} {currency}</p>
                                        <p className='ms-3 me-3'>SL: {item.quantity}</p>
                                        <p>Size: {item.size}</p>
                                    </div>

                                    <p className='text-start mt-2'>Thời gian đặt hàng: <span className='text-gray-600'>{new Date(item.date).toLocaleDateString()} </span></p>
                                    <p className='text-start mt-2'>Thanh toán: <span className='text-gray-600'>{item.paymentMethod} </span></p>
                                </div>
                            </div>

                            <div className='md:w-1/2 flex justify-between'>
                                <div className='flex items-center gap-2'>
                                    <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                                    <p className='text-sm md:text-base'>{item.status}</p>
                                </div>

                                <button onClick={() => navigate(`/order-detail/${item._id}`)} className='border px-4 py-2 text-sm font-medium rounded-sm'>Theo dõi đơn hàng </button>

                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Orders
