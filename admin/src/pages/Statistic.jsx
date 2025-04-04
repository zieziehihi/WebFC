import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Statistics = () => {
    const location = useLocation();
    const { orderStats = [], monthlyStats = [], yearlyStats = [], categoryStats = [], currency = 'VNĐ' } = location.state || {};
    const [viewType, setViewType] = useState('daily'); // daily, monthly, yearly, category

    const getChartData = () => {
        let labels, data, title;
        switch (viewType) {
            case 'daily':
                labels = orderStats.map(stat => stat.date);
                data = orderStats.map(stat => stat.total);
                title = 'Thống kê doanh thu theo ngày';
                break;
            case 'monthly':
                labels = monthlyStats.map(stat => stat.month);
                data = monthlyStats.map(stat => stat.total);
                title = 'Thống kê doanh thu theo tháng';
                break;
            case 'yearly':
                labels = yearlyStats.map(stat => stat.year);
                data = yearlyStats.map(stat => stat.total);
                title = 'Thống kê doanh thu theo năm';
                break;
            case 'category':
                labels = categoryStats.map(stat => stat.category);
                data = categoryStats.map(stat => stat.total);
                title = 'Thống kê doanh thu theo danh mục';
                break;
            default:
                return null;
        }

        return {
            labels,
            datasets: [{
                label: `Doanh thu (${currency})`,
                data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: viewType === 'category' ? 'rgba(75, 192, 192, 0.5)' : 'rgba(75, 192, 192, 0.2)',
                fill: viewType !== 'category',
            }],
            title,
        };
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: getChartData()?.title || '' },
        },
    };

    const renderDetails = () => {
        let stats;
        switch (viewType) {
            case 'daily': stats = orderStats; break;
            case 'monthly': stats = monthlyStats; break;
            case 'yearly': stats = yearlyStats; break;
            case 'category': stats = categoryStats; break;
            default: return null;
        }

        return stats.map((stat, index) => (
            <div key={index} className="border-2 border-gray-200 p-4 rounded-md text-sm text-gray-700">
                <p><strong>{viewType === 'category' ? 'Danh mục' : viewType === 'yearly' ? 'Năm' : viewType === 'monthly' ? 'Tháng' : 'Ngày'}:</strong> {stat.date || stat.month || stat.year || stat.category}</p>
                <p><strong>Doanh thu:</strong> {stat.total.toLocaleString('vi-VN')} {currency}</p>
            </div>
        ));
    };

    return (
        <div className="p-4">
            <p className="text-center w-full mb-5 text-lg font-bold">THỐNG KÊ ĐƠN HÀNG</p>

            <div className="flex justify-center mb-5 gap-4">
                <button onClick={() => setViewType('daily')} className={`px-4 py-2 rounded ${viewType === 'daily' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Theo ngày</button>
                <button onClick={() => setViewType('monthly')} className={`px-4 py-2 rounded ${viewType === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Theo tháng</button>
                <button onClick={() => setViewType('yearly')} className={`px-4 py-2 rounded ${viewType === 'yearly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Theo năm</button>
                <button onClick={() => setViewType('category')} className={`px-4 py-2 rounded ${viewType === 'category' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Theo danh mục</button>
            </div>

            {getChartData()?.labels.length === 0 ? (
                <p className="text-center text-gray-500">Chưa có dữ liệu thống kê cho {viewType === 'category' ? 'danh mục' : viewType}.</p>
            ) : (
                <div className="max-w-4xl mx-auto">
                    {viewType === 'category' ? (
                        <Bar data={getChartData()} options={chartOptions} />
                    ) : (
                        <Line data={getChartData()} options={chartOptions} />
                    )}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Chi tiết</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {renderDetails()}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Statistics;