import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import paypal from '@paypal/checkout-server-sdk';

const currency = "USD"
const deliveryCharge = 0

// Cấu hình PayPal
const environment = new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
);
const paypalClient = new paypal.core.PayPalHttpClient(environment);

// COD
const placedOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            total: amount, // Thêm trường total (bắt buộc trong schema)
            paymentMethod: "COD",
            payment: false,
            status: 'Đã đặt hàng', // Đảm bảo trường status là Object như trong schema
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: "Đã đặt hàng" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Paypal
const placedOrderPaypal = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        // Tạo request cho PayPal
        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");

        // Tính tổng số tiền (amount + deliveryCharge)
        const totalAmount = (amount + deliveryCharge) / 100;

        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: currency.toUpperCase(),
                    value: totalAmount.toFixed(2),
                    breakdown: {
                        item_total: {
                            currency_code: currency.toUpperCase(),
                            value: (amount / 100).toFixed(2)
                        },
                        shipping: {
                            currency_code: currency.toUpperCase(),
                            value: (deliveryCharge / 100).toFixed(2)
                        }
                    }
                },
                description: 'Thanh toán đơn hàng',
            }],
            application_context: {
                return_url: `${process.env.FRONTEND_URL}/verify-paypal-payment`,
                cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`
            }
        });

        // Tạo order với PayPal
        const order = await paypalClient.execute(request);

        // Lưu thông tin đơn hàng vào database
        const orderData = {
            userId,
            items,
            address,
            amount,
            total: amount + deliveryCharge, // Thêm trường total
            paymentMethod: "Paypal",
            payment: false,
            status: 'Đã đặt hàng', // Đảm bảo trường status là Object
            paypalOrderId: order.result.id,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Xóa giỏ hàng
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // Trả về link phê duyệt của PayPal
        const approvalLink = order.result.links.find(link => link.rel === 'approve');

        res.json({
            success: true,
            message: "Đơn hàng đã được tạo",
            approvalUrl: approvalLink.href,
            orderId: newOrder._id
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Hàm verify payment sau khi người dùng hoàn tất thanh toán
const verifyPaypalPayment = async (req, res) => {
    try {
        const { orderId, paypalOrderId } = req.body;

        // Xác minh thanh toán với PayPal
        const request = new paypal.orders.OrdersCaptureRequest(paypalOrderId);
        const capture = await paypalClient.execute(request);

        if (capture.result.status === 'COMPLETED') {
            // Cập nhật trạng thái thanh toán trong database
            await orderModel.findByIdAndUpdate(orderId, {
                payment: true,
                paypalPaymentId: capture.result.id,
                status: 'Đã xác nhận' // Đảm bảo trường status là Object
            });

            res.json({
                success: true,
                message: 'Thanh toán thành công'
            });
        } else {
            res.json({
                success: false,
                message: 'Thanh toán chưa được hoàn tất'
            });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// All orders
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Update
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'Đã cập nhật trạng thái đơn hàng!' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// User order
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body
        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



export { placedOrder, placedOrderPaypal, verifyPaypalPayment, allOrders, updateStatus, userOrders }