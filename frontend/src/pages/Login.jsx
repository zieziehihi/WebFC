import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
    const [currentState, setCurrentState] = useState('Đăng Nhập');
    const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            if (currentState === 'Đăng Ký') {
                const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });

                if (response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem('token', response.data.token);
                    console.log('Đăng ký thành công:', response.data);
                    toast.success('Đăng ký thành công!');

                } else {
                    toast.error(response.data.message);
                }

            } else {
                const response = await axios.post(`${backendUrl}/api/user/login`, { email, password });
                console.log('Response từ server khi đăng nhập:', response.data);

                if (response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem('token', response.data.token);
                    toast.success('Đăng nhập thành công!');

                } else {
                    toast.error(response.data.message);
                }
            }

        } catch (error) {
            console.error('Lỗi:', error);
            toast.error(error.response?.data?.message || 'Có lỗi xảy ra!');
        }
    };

    useEffect(() => {
        if (token) {
            console.log('Token đã được set:', token);
            navigate('/');
        }
    }, [token, navigate]);

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
            <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                <p className='prata-regular text-3xl'>{currentState}</p>
                <hr className='border-none h-[1.5px] w-8 bg-gray-800'></hr>
            </div>

            {currentState === 'Đăng Nhập' ? '' :
                <input onChange={(e) => setName(e.target.value)} value={name} className='w-full px-3 py-2 border border-gray-800' type='text' placeholder='Tên người dùng' required></input>}
            <input onChange={(e) => setEmail(e.target.value)} value={email} className='w-full px-3 py-2 border border-gray-800' type='email' placeholder='Email' required></input>
            <input onChange={(e) => setPassword(e.target.value)} value={password} className='w-full px-3 py-2 border border-gray-800' type='password' placeholder='Mật khẩu' required></input>

            <div className='w-full flex justify-between text-sm mt-[-8px]'>
                <p className='cursor-pointer'>Quên mật khẩu</p>
                {
                    currentState === 'Đăng Nhập' ?
                        <p onClick={() => setCurrentState('Đăng Ký')}>Tạo tài khoản mới</p> :
                        <p onClick={() => setCurrentState('Đăng Nhập')}>Đăng nhập</p>
                }
            </div>

            <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Đăng Nhập' ? 'Đăng nhập' : 'Đăng ký'}</button>
        </form>
    );
};

export default Login;