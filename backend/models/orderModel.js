import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: Object, required: true, default: 'Đã đặt hàng' },
    paymentMethod: { type: String, required: true },
    payment: { type: Boolean, required: true, default: false },
    date: { type: Number, required: true, default: Date.now },
    paypalOrderId: { type: String, required: false },
    paypalPaymentId: { type: String, required: false },
    total: { type: Number, required: true },
})

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema)
export default orderModel