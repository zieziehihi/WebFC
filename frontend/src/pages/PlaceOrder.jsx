import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
    const [method, setMethod] = useState('cod');
    const { navigate, products, delivery_fee, cartItems, setCartItems, getCartAmount, backendUrl, token } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        houseNumber: '',
        street: '',
        ward: '',
        district: '',
        city: '',
        country: ''
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(data => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            let orderItems = [];

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items));
                        if (itemInfo) {
                            itemInfo.size = item;
                            itemInfo.quantity = cartItems[items][item];
                            orderItems.push(itemInfo);
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            };

            switch (method) {

                case 'cod': {
                    const response = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers: { token } });

                    if (response.data.success) {
                        setCartItems({});
                        navigate('/orders');

                    } else {
                        toast.error(response.data.message);
                    }

                    break;
                }

                case 'paypal': {
                    const responsePaypal = await axios.post(`${backendUrl}/api/order/paypal`, orderData, { headers: { token } });

                    if (responsePaypal.data.success) {
                        // Lưu orderId để verify sau
                        localStorage.setItem("orderId", responsePaypal.data.orderId);
                        // Redirect đến PayPal approval URL
                        window.location.replace(responsePaypal.data.approvalUrl);
                    } else {
                        toast.error(responsePaypal.data.message);
                    }
                    break;
                }

                default:
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

            {/* CUSTOMER INFO */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={'THÔNG TIN '} text2={' ĐẶT HÀNG'} />
                </div>

                <input onChange={onChangeHandler} name='fullName' value={formData.fullName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                    type='text' placeholder='Họ và tên' />

                <input onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                    type='email' placeholder='Email' />

                <input onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                    type='number' placeholder='Số điện thoại' />

                <div className='flex gap-3'>
                    <input onChange={onChangeHandler} name='houseNumber' value={formData.houseNumber} className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                        type='text' placeholder='Số nhà (tòa nhà)' />

                    <input onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                        type='text' placeholder='Đường' />
                </div>

                <div className='flex gap-3'>
                    <input onChange={onChangeHandler} name='ward' value={formData.ward} className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                        type='text' placeholder='Phường (huyện)' />
                    <input onChange={onChangeHandler} name='district' value={formData.district} className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                        type='text' placeholder='Quận (tỉnh)' />
                </div>

                <div className='flex gap-3'>
                    <input onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                        type='text' placeholder='Thành phố' />

                    <input onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
                        type='text' placeholder='Quốc gia' />
                </div>

            </div>

            <div className='mt-3'>

                {/* TOTAL */}
                <div className='mt-5 min-w-60'>
                    <CartTotal />
                </div>

                <div className='mt-12'>
                    <Title text1={'PHƯƠNG THỨC '} text2={' THANH TOÁN'} />

                    {/* SELECT PAYMENT METHOD */}
                    <div className='flex gap-3 flex-col'>
                        <div onClick={() => setMethod('paypal')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'paypal' ? 'bg-green-400' : ''}`} />
                            <img className='max-w-full h-5 mx-4' src={assets.paypal_logo} alt='' />
                        </div>

                        <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`} />
                            <p className='text-gray-800 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                        </div>
                    </div>

                    {/* BUTTON ORDER */}
                    <div className='w-full text-center mt-8'>
                        <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;