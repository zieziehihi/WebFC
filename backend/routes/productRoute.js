import express from 'express'
import { listProducts, addProduct, updateProduct, removeProduct, singleProduct } from '../controllers/productController.js'
import upload from '../middleware/multer.js';
import { roleAuth } from '../middleware/roleAuth.js';

const productRouter = express.Router();

productRouter.post('/add', upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), addProduct);
productRouter.post('/remove', removeProduct);
productRouter.post('/single', singleProduct);
productRouter.get('/list', listProducts);
productRouter.post('/update', updateProduct);

export default productRouter