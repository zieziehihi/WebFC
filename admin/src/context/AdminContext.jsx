import React, { createContext } from 'react';
import AdminContextProvider from './AdminContextProvider';

// Tạo context
export const AdminContext = createContext();
export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = 'VNĐ';

<AdminContextProvider />

