import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../context/AdminContext.jsx';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets.js';
import { Link } from 'react-router-dom'; // Thêm Link từ react-router-dom

const Orders = ({ token }) => {
    const [orders, setOrders] = useState([]);
    const [orderStats, setOrderStats] = useState([]); // State để lưu kết quả thống kê
    const [monthlyStats, setMonthlyStats] = useState([]);
    const [yearlyStats, setYearlyStats] = useState([]);

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

    const calculateOrderStats = () => {
        const dailyStats = {};
        const monthlyStats = {};
        const yearlyStats = {};

        orders.forEach(order => {
            const dateObj = new Date(order.date);
            const date = dateObj.toISOString().split('T')[0];
            const month = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}`;
            const year = dateObj.getFullYear().toString();
            const total = order.total || order.amount;

            if (!dailyStats[date]) dailyStats[date] = 0;
            if (!monthlyStats[month]) monthlyStats[month] = 0;
            if (!yearlyStats[year]) yearlyStats[year] = 0;

            dailyStats[date] += total;
            monthlyStats[month] += total;
            yearlyStats[year] += total;
        });

        setOrderStats(Object.entries(dailyStats).map(([date, total]) => ({ date, total })).sort((a, b) => new Date(a.date) - new Date(b.date)));
        setMonthlyStats(Object.entries(monthlyStats).map(([month, total]) => ({ month, total })).sort((a, b) => new Date(a.month) - new Date(b.month)));
        setYearlyStats(Object.entries(yearlyStats).map(([year, total]) => ({ year, total })).sort((a, b) => parseInt(a.year) - parseInt(b.year)));
    };

    useEffect(() => {
        fetchAllOrders();
    }, [token]);

    useEffect(() => {
        if (orders.length > 0) {
            calculateOrderStats();
        }
    }, [orders]);

    return (
        <div className="p-4">
            <p className="text-center w-full mb-5 text-lg font-bold">DANH SÁCH ĐƠN HÀNG</p>

            <div className="text-center mb-5">
                <Link
                    to="/statistic"
                    state={{ orderStats, monthlyStats, yearlyStats, currency }}
                    className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Xem thống kê đơn hàng
                </Link>
            </div>

            {/* Hiển thị đơn hàng */}
            <div>
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
        </div>
    );
};

export default Orders;
