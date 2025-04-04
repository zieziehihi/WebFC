import express from 'express';
import { updateInventory } from '../controllers/productController.js';

const router = express.Router();

// Route để cập nhật số lượng tồn kho
router.put('/update', updateInventory);

export default router;