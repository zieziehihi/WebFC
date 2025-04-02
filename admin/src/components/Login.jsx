import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../context/AdminContext'; // Assuming backendUrl is exported from your context
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();

            // Send the login request
            const response = await axios.post(`${backendUrl}/api/user/admin`, { email, password });

            if (response.data.success) {
                // If login is successful, set the token in the state
                setToken(response.data.token);
                toast.success('Đăng nhập thành công!');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message || 'Có lỗi xảy ra');
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center w-full'>
            <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
                <h1 className='text-2xl font-bold mb-4'>Admin</h1>

                <form onSubmit={onSubmitHandler}>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Email</p>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
                            type='email'
                            placeholder='email@email.com'
                            required
                        />
                    </div>

                    <div className='mb-3 min-w-72 '>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Mật khẩu</p>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
                            type='password'
                            placeholder='abcd123'
                            required
                        />
                    </div>

                    <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type='submit'>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
