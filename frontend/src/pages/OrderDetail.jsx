import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import Title from '../components/Title';
import { toast } from 'react-toastify';

const OrderDetail = () => {
    const { backendUrl, token } = useContext(ShopContext);
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/order-detail/${orderId}`, { headers: { token } });
                if (response.data.success) {
                    setOrder(response.data.order);
                } else {
                    toast.error("Không tìm thấy đơn hàng");
                }
            } catch (error) {
                console.error("Lỗi khi tải chi tiết đơn hàng:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetail();
    }, [backendUrl, orderId, token]);

    if (loading) return <p className="text-center mt-10">Đang tải...</p>;
    if (!order) return <p className="text-center mt-10">Không tìm thấy đơn hàng</p>;

    return (
        <div className='p-6'>
            <Title text1={'CHI TIẾT '} text2={'ĐƠN HÀNG'} />

            <div className='mt-6 border p-4 rounded'>
                <p><strong>Mã đơn hàng:</strong> {order.orderId}</p>
                <p><strong>Ngày đặt:</strong> {new Date(order.date).toLocaleDateString()}</p>
                <p><strong>Trạng thái:</strong> {order.status}</p>
                <p><strong>Phương thức thanh toán:</strong> {order.paymentMethod}</p>
            </div>

            <div className='mt-6'>
                <h2 className='text-xl font-semibold'>Sản phẩm</h2>
                {order.items.map((item, index) => (
                    <div key={index} className='flex items-center gap-4 border-b py-4'>
                        <img src={item.image[0]} className='w-16 h-16 object-cover' alt={item.name} />
                        <div>
                            <p className='font-medium'>{item.name}</p>
                            <p>Giá: {item.price.toLocaleString('vi-VN')} VND</p>
                            <p>Số lượng: {item.quantity}</p>
                            <p>Size: {item.size}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='mt-6 border p-4 rounded'>
                <h2 className='text-xl font-semibold'>Địa chỉ giao hàng</h2>
                <p>{order.address.fullName}</p>
                <p>{order.address.phone}</p>
                <p>{order.address.street}, {order.address.ward}, {order.address.district}, {order.address.city}, {order.address.country}</p>
            </div>

            <div className='mt-6 border p-4 rounded'>
                <h2 className='text-xl font-semibold'>Tổng tiền</h2>
                <p className='text-lg font-bold'>{(order.amount).toLocaleString('vi-VN')} VND</p>
            </div>
        </div>
    );
};

export default OrderDetail;
