import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../context/AdminContext.jsx';
import { toast } from 'react-toastify';

const Inventory = ({ token }) => {
    const [inventory, setInventory] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        category: '',
        quantity: 0,
        price: 0,
    });
    const [loading, setLoading] = useState(false);

    // Lấy danh sách sản phẩm trong kho
    const fetchInventory = async () => {
        if (!token) return;

        setLoading(true);
        try {
            const response = await axios.get(`${backendUrl}/api/inventory/list`, {
                headers: { token },
            });
            if (response.data.success) {
                setInventory(response.data.inventory);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Thêm sản phẩm mới
    const addProduct = async () => {
        if (!newProduct.name || newProduct.quantity < 0 || newProduct.price < 0) {
            toast.error('Vui lòng nhập đầy đủ thông tin hợp lệ!');
            return;
        }

        try {
            const response = await axios.post(
                `${backendUrl}/api/inventory/add`,
                newProduct,
                { headers: { token } }
            );
            if (response.data.success) {
                toast.success('Thêm sản phẩm thành công!');
                setNewProduct({ name: '', category: '', quantity: 0, price: 0 });
                fetchInventory();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Cập nhật số lượng sản phẩm
    const updateQuantity = async (productId, newQuantity) => {
        if (newQuantity < 0) {
            toast.error('Số lượng không thể âm!');
            return;
        }

        try {
            const response = await axios.put(
                `${backendUrl}/api/inventory/update`,
                { productId, quantity: newQuantity },
                { headers: { token } }
            );
            if (response.data.success) {
                toast.success('Cập nhật số lượng thành công!');
                fetchInventory();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Xóa sản phẩm
    const deleteProduct = async (productId) => {
        if (!window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;

        try {
            const response = await axios.delete(`${backendUrl}/api/inventory/delete/${productId}`, {
                headers: { token },
            });
            if (response.data.success) {
                toast.success('Xóa sản phẩm thành công!');
                fetchInventory();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchInventory();
    }, [token]);

    return (
        <div className="p-4">
            <p className="text-center w-full mb-5 text-lg font-bold">QUẢN LÝ KHO</p>

            {/* Form thêm sản phẩm */}
            <div className="mb-6 max-w-xl mx-auto">
                <h3 className="text-lg font-semibold mb-2">Thêm sản phẩm mới</h3>
                <div className="grid grid-cols-1 gap-4">
                    <input
                        type="text"
                        placeholder="Tên sản phẩm"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Danh mục"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        className="p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="number"
                        placeholder="Số lượng"
                        value={newProduct.quantity}
                        onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) || 0 })}
                        className="p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="number"
                        placeholder="Giá (VNĐ)"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
                        className="p-2 border border-gray-300 rounded"
                    />
                    <button
                        onClick={addProduct}
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Thêm sản phẩm
                    </button>
                </div>
            </div>

            {/* Danh sách sản phẩm trong kho */}
            <div>
                {loading ? (
                    <p className="text-center text-gray-500">Đang tải...</p>
                ) : inventory.length === 0 ? (
                    <p className="text-center text-gray-500">Chưa có sản phẩm trong kho.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {inventory.map((product) => (
                            <div
                                key={product._id}
                                className="border-2 border-gray-200 p-4 rounded-md text-sm text-gray-700 shadow-sm"
                            >
                                <p><strong>Tên:</strong> {product.name}</p>
                                <p><strong>Danh mục:</strong> {product.category || 'Không có'}</p>
                                <p><strong>Giá:</strong> {product.price.toLocaleString('vi-VN')} VNĐ</p>
                                <div className="flex items-center mt-2">
                                    <strong>Số lượng:</strong>
                                    <input
                                        type="number"
                                        value={product.quantity}
                                        onChange={(e) =>
                                            updateQuantity(product._id, parseInt(e.target.value) || 0)
                                        }
                                        className="ml-2 p-1 w-20 border border-gray-300 rounded"
                                    />
                                </div>
                                <button
                                    onClick={() => deleteProduct(product._id)}
                                    className="mt-3 p-2 bg-red-500 text-white rounded hover:bg-red-600 w-full"
                                >
                                    Xóa
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inventory;