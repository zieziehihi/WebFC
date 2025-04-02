import express from 'express'
import { placedOrder, placedOrderPaypal, verifyPaypalPayment, allOrders, updateStatus, userOrders } from '../controllers/orderController.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// ADMIN
orderRouter.post('/list', allOrders)
orderRouter.post('/status', updateStatus)
orderRouter.post('/statistic', updateStatus)

// PAYMENT
orderRouter.post('/place', authUser, placedOrder)
orderRouter.post('/paypal', authUser, placedOrderPaypal)
orderRouter.post('/verify-paypal', verifyPaypalPayment);



// USER
orderRouter.post('/userorders', authUser, userOrders)

export default orderRouter

