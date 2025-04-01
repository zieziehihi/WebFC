import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../context/AdminContext';
import { toast } from 'react-toastify';

const Update = ({ product, onUpdateSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        sizes: [],
        bestseller: false,
        images: []
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                description: product.description || '',
                price: product.price ? product.price.toString() : '', // Chuyển price thành chuỗi để hiển thị trong input
                category: product.category || '',
                sizes: Array.isArray(product.sizes) ? product.sizes : [], // Giữ nguyên mảng
                bestseller: product.bestseller || false,
                images: []
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "bestseller") {
            setFormData((prev) => ({ ...prev, bestseller: value === "true" }));
        } else if (name === "price") {
            // Đảm bảo price là số dương
            if (value < 0) {
                toast.error("Giá sản phẩm không thể âm!");
                return;
            }
            setFormData((prev) => ({ ...prev, price: value }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        // Validation: Giới hạn số lượng ảnh (tối đa 4 ảnh)
        if (files.length > 4) {
            toast.error("Chỉ được upload tối đa 4 ảnh!");
            return;
        }
        setFormData((prev) => ({ ...prev, images: files }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation trước khi gửi
        if (!formData.name.trim()) {
            toast.error("Tên sản phẩm không được để trống!");
            return;
        }
        if (!formData.description.trim()) {
            toast.error("Mô tả không được để trống!");
            return;
        }
        if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
            toast.error("Giá sản phẩm phải là một số dương!");
            return;
        }
        if (!formData.category) {
            toast.error("Vui lòng chọn danh mục!");
            return;
        }
        if (formData.sizes.length === 0) {
            toast.error("Vui lòng chọn ít nhất một kích thước!");
            return;
        }

        const updatedData = new FormData();
        updatedData.append("productId", product._id);
        updatedData.append("name", formData.name);
        updatedData.append("description", formData.description);
        updatedData.append("price", formData.price);
        updatedData.append("category", formData.category);
        updatedData.append("sizes", JSON.stringify(formData.sizes)); // Chuyển mảng thành chuỗi JSON
        updatedData.append("bestseller", formData.bestseller);

        // Thêm ảnh vào FormData với key là image1, image2, ...
        formData.images.forEach((image, index) => {
            updatedData.append(`image${index + 1}`, image);
        });

        try {
            const response = await axios.post(`${backendUrl}/api/product/update`, updatedData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            if (response.data.success) {
                toast.success("Cập nhật thành công!");
                onUpdateSuccess();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật sản phẩm:", error);
            toast.error(error.response?.data?.message || "Lỗi khi cập nhật sản phẩm!");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="update-form">
            <div className='w-86'>
                <p className='mt-5 mb-3'>Tên sản phẩm</p>
                <input
                    onChange={handleChange}
                    className='w-full max-w-[600px] border border-gray-300 rounded py-1.5 px-3.5'
                    type="text"
                    name="name"
                    value={formData.name}
                    required
                />
            </div>

            <div className='w-86'>
                <p className='mt-5 mb-3'>Mô tả</p>
                <textarea onChange={handleChange} className='w-full max-w-[600px] border border-gray-300 rounded py-1.5 px-3.5 text-center'
                    name="description" value={formData.description} required />
            </div>

            <div className='flex flex-col sm:flex-row gap-8 w-full sm:gap-5'>
                <div>
                    <p className='mt-5 mb-3'>Danh mục</p>
                    <select onChange={handleChange} className='h-8 w-32 border border-gray-300 rounded' name="category" value={formData.category} >
                        <option value="">Chọn danh mục</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kid">Kid</option>
                    </select>
                </div>

                <div>
                    <p className='mt-5 mb-3'>Giá sản phẩm</p>
                    <input onChange={handleChange} className='w-35 border border-gray-300 rounded py-1.5 px-3.5' type="number" name="price" value={formData.price} min="0" required />
                </div>
            </div>

            <div className='mt-5'>
                <label>Kích thước</label>
                <div className='flex gap-3 mt-3'>
                    {["S", "M", "L", "XL", "XXL"].map((size) => (
                        <div
                            key={size}
                            onClick={() => {
                                setFormData((prev) => {
                                    const newSizes = prev.sizes.includes(size)
                                        ? prev.sizes.filter(item => item !== size)
                                        : [...prev.sizes, size];
                                    return { ...prev, sizes: newSizes };
                                });
                            }}
                        >
                            <p className={`${formData.sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer rounded`}>
                                {size}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className='mt-5'>
                <label>Bestseller:</label>
                <select
                    className='ml-5 border border-gray-300 rounded py-1 px-2'
                    name="bestseller"
                    value={formData.bestseller.toString()}
                    onChange={handleChange}
                >
                    <option value="false">Không</option>
                    <option value="true">Có</option>
                </select>
            </div>

            <div className='mt-5'>
                <label>Hình ảnh:</label>
                <input
                    className='ml-5'
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>

            <button className='w-28 h-10 mt-6 bg-black rounded text-white hover:bg-gray-800' type="submit" >Cập nhật</button>
        </form>
    );
};

export default Update;