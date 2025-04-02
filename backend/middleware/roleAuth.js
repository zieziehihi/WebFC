import jwt from 'jsonwebtoken';

const roleAuth = (allowedRoles) => {
    return async (req, res, next) => {
        try {
            // Lấy token từ header
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ success: false, message: 'Không có token, truy cập bị từ chối' });
            }

            const token = authHeader.split(' ')[1];

            // Giải mã token
            let decoded;
            try {
                decoded = jwt.verify(token, process.env.JWT_SECRET);
                console.log("Decoded Token:", decoded); // <-- Thêm dòng này để kiểm tra token
            } catch (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ success: false, message: 'Token đã hết hạn' });
                }
                return res.status(401).json({ success: false, message: 'Token không hợp lệ' });
            }

            // Kiểm tra vai trò của người dùng
            if (!allowedRoles.includes(decoded.role)) {
                return res.status(403).json({ success: false, message: 'Bạn không có quyền truy cập chức năng này' });
            }

            // Lưu thông tin người dùng vào request để sử dụng sau
            req.user = decoded;
            next();
        } catch (error) {
            console.error('Lỗi xác thực:', error);
            res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
        }
    };
};

export { roleAuth };
