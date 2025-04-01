import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../context/AdminContext.jsx';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets.js';

const Orders = ({ token }) => {
    const [orders, setOrders] = useState([]);
    //const [revenueByTimeData, setRevenueByTimeData] = useState([]);
    //const [groupBy, setGroupBy] = useState('day'); // Mặc định nhóm theo ngày

    const fetchAllOrders = async () => {
        if (!token) {
            return;
        }

        try {
            const response = await axios.post(`${backendUrl}/api/order/list`, {}, { headers: { token } });
            if (response.data.success) {
                setOrders(response.data.orders);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    {/*  const fetchRevenueByTime = async () => {
        if (!token) {
            return;
        }

        try {
            const response = await axios.get(`${backendUrl}/api/order/revenue-by-time?groupBy=${groupBy}`, { headers: { token } });
            if (response.data.success) {
                setRevenueByTimeData(response.data.data);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }; */}

    const statusHandler = async (event, orderId) => {
        try {
            const response = await axios.post(
                `${backendUrl}/api/order/status`,
                { orderId, status: event.target.value },
                { headers: { token } }
            );

            if (response.data.success) {
                await fetchAllOrders();
                toast.success('Cập nhật trạng thái thành công!');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Lỗi khi cập nhật trạng thái');
        }
    };

    useEffect(() => {
        fetchAllOrders();
        //fetchRevenueByTime();
    }, [token]); // groupBy

    return (
        <div className="p-4">
            <p className="text-center w-full mb-5 text-lg font-bold">DANH SÁCH ĐƠN HÀNG</p>

            {/* Thống kê doanh thu theo thời gian 
            
             <div className="mb-8">
                <h2 className="text-lg font-semibold mb-3">Thống kê doanh thu theo thời gian</h2>
                <div className="mb-4">
                    <label className="mr-2">Nhóm theo: </label>
                    <select
                        value={groupBy}
                        onChange={(e) => setGroupBy(e.target.value)}
                        className="p-2 border rounded-md"
                    >
                        <option value="day">Ngày</option>
                        <option value="month">Tháng</option>
                        <option value="year">Năm</option>
                    </select>
                </div>
                {revenueByTimeData.length === 0 ? (
                    <p className="text-gray-500">Chưa có dữ liệu doanh thu.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {revenueByTimeData.map((item, index) => (
                            <div key={index} className="p-4 border rounded-md shadow-sm">
                                <p className="font-medium">Thời gian: {item.time}</p>
                                <p>Tổng doanh thu: {(item.totalRevenue).toLocaleString('vi-VN')} {currency}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            */}

            {/* Danh sách đơn hàng */}
            {orders.length === 0 ? (
                <p className="text-center text-gray-500">Chưa có đơn hàng nào.</p>
            ) : (
                <div>
                    {orders.map((order, index) => (
                        <div
                            className="grid grid-cols-1 sm:grid-cols-[1fr_2fr_1fr] lg:grid-cols-[1fr_1.8fr_1.5fr_1fr] gap-4 items-start border-2 border-gray-200 p-6 my-4 text-sm md:text-base text-gray-700"
                            key={order._id || index}
                        >
                            <div>
                                <img
                                    className="w-12 h-12 mb-4 mt-2 mx-5"
                                    src={assets.parcel_icon}
                                    alt="Parcel icon"
                                />
                                <p className="w-auto">
                                    Tổng: {(order.total || order.amount).toLocaleString('vi-VN')} {currency}
                                </p>
                                <p className="w-auto text-gray-500">
                                    Sản phẩm: {order.amount.toLocaleString('vi-VN')} {currency}
                                </p>
                                <select
                                    onChange={(event) => statusHandler(event, order._id)}
                                    value={order.status}
                                    className="text-sm mt-3 p-2 border border-gray-300 rounded-md w-full sm:w-auto"
                                >
                                    <option value="Đã đặt hàng">Đã đặt hàng</option>
                                    <option value="Đang chuẩn bị hàng">Đang chuẩn bị hàng</option>
                                    <option value="Đã vận chuyển">Đã vận chuyển</option>
                                    <option value="Đang giao hàng">Đang giao hàng</option>
                                    <option value="Đã giao hàng">Đã giao hàng</option>
                                </select>
                            </div>

                            <div className="text-sm">
                                {order.items && order.items.length > 0 ? (
                                    order.items.map((item, index) => (
                                        <p className="py-1" key={index}>
                                            {item.name} x {item.quantity}{' '}
                                            <span className="text-gray-500">{item.size || ''}</span>
                                        </p>
                                    ))
                                ) : (
                                    <p>Không có sản phẩm</p>
                                )}
                            </div>

                            <div className="text-sm">
                                {order.address ? (
                                    <>
                                        <p className="mt-2 mb-2 font-medium">{order.address.fullName || 'N/A'}</p>
                                        <p className="mt-1">{order.address.email || 'N/A'}</p>
                                        <p className="mt-1">{order.address.phone || 'N/A'}</p>
                                        <p className="mt-1">
                                            {order.address.houseNumber}, {order.address.street}, {order.address.ward},{' '}
                                            {order.address.district}, {order.address.city}, {order.address.country}
                                        </p>
                                    </>
                                ) : (
                                    <p>Thông tin địa chỉ không khả dụng</p>
                                )}
                            </div>

                            <div className="text-sm">
                                <p className="mt-3">• Số sản phẩm: {order.items?.length || 0}</p>
                                <p className="mt-1">• Phương thức: {order.paymentMethod || 'N/A'}</p>
                                <p className="mt-1">• Tình trạng: {order.payment ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
                                <p className="mt-1">
                                    • Thời gian: {new Date(order.date).toLocaleString('vi-VN')}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;