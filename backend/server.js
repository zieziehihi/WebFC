import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import connectCloudinary from './config/cloudinary.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import inventoryRouter from './routes/inventoryRoute.js'

// APP CONFIG
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// MIDDLEWARE
app.use(express.json())
app.use(cors())

// API ENDPOINTS
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/inventory', inventoryRouter);
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
    res.send('API working')
})

app.listen(port, () => console.log('Servr started on PORT: ' + port))


