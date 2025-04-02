import React from 'react';
import { useLocation } from 'react-router-dom'; // Sử dụng useLocation để lấy state
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Statistics = () => {
    const location = useLocation();
    const { orderStats = [], currency = 'VNĐ' } = location.state || {}; // Lấy orderStats và currency từ state

    // Chuẩn bị dữ liệu cho biểu đồ
    const chartData = {
        labels: orderStats.map(stat => stat.date), // Ngày
        datasets: [
            {
                label: `Doanh thu (${currency})`,
                data: orderStats.map(stat => stat.total), // Tổng doanh thu
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Thống kê doanh thu theo ngày',
            },
        },
    };

    return (
        <div className="p-4">
            <p className="text-center w-full mb-5 text-lg font-bold">THỐNG KÊ ĐƠN HÀNG</p>

            {orderStats.length === 0 ? (
                <p className="text-center text-gray-500">Chưa có dữ liệu thống kê.</p>
            ) : (
                <div className="max-w-4xl mx-auto">
                    <Line data={chartData} options={chartOptions} />
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Chi tiết</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {orderStats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="border-2 border-gray-200 p-4 rounded-md text-sm text-gray-700"
                                >
                                    <p><strong>Ngày:</strong> {stat.date}</p>
                                    <p><strong>Doanh thu:</strong> {stat.total.toLocaleString('vi-VN')} {currency}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Statistics;