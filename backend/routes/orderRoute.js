import express from 'express'
import { placedOrder, placedOrderPaypal, verifyPaypalPayment, allOrders, updateStatus, userOrders } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// ADMIN
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// PAYMENT
orderRouter.post('/place', authUser, placedOrder)
orderRouter.post('/paypal', authUser, placedOrderPaypal)
orderRouter.post('/verify-paypal', verifyPaypalPayment);


// USER
orderRouter.post('/userorders', authUser, userOrders)

export default orderRouter

