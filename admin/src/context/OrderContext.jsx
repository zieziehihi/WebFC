import React, { createContext, useState } from 'react';

export const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
    const [orderStats, setOrderStats] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const currency = 'VNĐ';

    return (
        <OrderContext.Provider value={{ orderStats, setOrderStats, backendUrl, currency }}>
            {children}
        </OrderContext.Provider>
    );
};

export default OrderContextProvider;