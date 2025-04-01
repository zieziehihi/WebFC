import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import ReactDOM from "react-dom/client"
import './index.css'
import App from './App.jsx'
import ShopContextProvider from './context/ShopContextProvider.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </BrowserRouter>
);
