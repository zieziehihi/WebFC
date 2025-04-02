import express from 'express';
import { loginUser, registerUser, adminLogin } from '../controllers/userController.js';
import { roleAuth } from '../middleware/roleAuth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

// Chỉ admin mới có thể đăng nhập vào trang quản trị
userRouter.post('/admin', adminLogin);

export default userRouter;
