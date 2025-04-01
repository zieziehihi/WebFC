import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../context/AdminContext';
import { toast } from 'react-toastify';
import Update from './Update';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import '../index.css'

const List = ({ token }) => {
    const [list, setList] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    const fetchList = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setList(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const removeProduct = async (id) => {
        confirmAlert({
            title: "",
            message: "Bạn chắc chắn muốn xoá sản phẩm này chứ?",
            buttons: [
                {
                    label: "Xóa", onClick: async () => {
                        try {
                            const response = await axios.post(`${backendUrl}/api/product/remove`, { id }, { headers: { token } });

                            if (response.data.success) {
                                toast.success('Xoá sản phẩm thành công');
                                await fetchList();
                            } else {
                                toast.error(response.data.message);
                            }
                        } catch (error) {
                            console.log(error);
                            toast.error(error.message);
                        }
                    }
                },
                {
                    label: "Hủy", onClick: () => toast.info("Đã hủy xóa sản phẩm")
                }
            ],

            overlayClassName: "custom-confirm-alert"
        });
    };


    useEffect(() => {
        fetchList();
    }, []);

    return (
        <>
            <p className='text-center mb-5 text-lg font-bold'>DANH SÁCH SẢN PHẨM</p>

            {editingProduct && (
                <div className='border p-4 mb-4 bg-gray-100 rounded'>
                    <h3 className='text-center text-lg font-bold mb-2'>Cập nhật sản phẩm</h3>
                    <Update product={editingProduct} onUpdateSuccess={() => { fetchList(); setEditingProduct(null); }} />
                    <button className='mt-2 w-28 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600' onClick={() => setEditingProduct(null)}>
                        Hủy
                    </button>
                </div>
            )}

            <div className='flex flex-col gap-2'>
                <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
                    <b>Hình ảnh</b>
                    <b>Tên sản phẩm</b>
                    <b className='text-center'>Danh mục</b>
                    <b className='text-center'>Giá</b>
                    <b className='text-center'>Thao tác</b>
                </div>

                {list.map((item, index) => (
                    <div
                        className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index} >

                        <img className='w-18' src={item.image[0]} alt='' />
                        <p>{item.name}</p>
                        <p className='text-center'>{item.category}</p>
                        <p className='text-center'>{item.price.toLocaleString('vi-VN')} {currency}</p>

                        <div className='grid md:grid-cols-[0.5fr_0.5fr]'>
                            <p onClick={() => setEditingProduct(item)} className='md:text-center cursor-pointer text-blue-700'>Sửa</p>
                            <p onClick={() => removeProduct(item._id)} className='md:text-center cursor-pointer text-red-700'>Xoá</p>

                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default List;
