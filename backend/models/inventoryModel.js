import mongoose from 'mongoose';

const InventorySchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 0 },
});

export default mongoose.model('Inventory', InventorySchema);