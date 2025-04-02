import React, { useState } from 'react'


// Tạo provider để bọc ứng dụng
const AdminContextProvider = ({ children }) => {
    const [orderStats, setOrderStats] = useState([]); // State để lưu orderStats

    // Giá trị backendUrl và currency từ import.meta.env
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const currency = 'VNĐ';

    return (
        <AdminContext.Provider value={{ backendUrl, currency, orderStats, setOrderStats }}>
            {children}
        </AdminContext.Provider>
    );
};


export default AdminContextProvider
