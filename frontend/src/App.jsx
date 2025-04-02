import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Cart from './pages/Cart'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Product from './pages/Product'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import VerifyPaypal from './pages/VerifyPaypal'
import OrderDetail from './pages/OrderDetail'
import PaymentSuccess from './pages/PaymentSuccess'
import { ToastContainer } from 'react-toastify';


const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/order-detail' element={<OrderDetail />} />
        <Route path="/verify-paypal-payment" element={<VerifyPaypal />} />
        <Route path='/product' element={<Product />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path='/payment-success' element={<PaymentSuccess />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
