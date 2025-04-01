import React, { useEffect, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const VerifyPaypal = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { backendUrl, token, setCartItems } = useContext(ShopContext);

    useEffect(() => {
        const verifyPaypal = async () => {
            try {
                const paypalOrderId = new URLSearchParams(location.search).get("token");
                const orderId = localStorage.getItem("orderId");

                const response = await axios.post(
                    `${backendUrl}/api/order/verify-paypal`,
                    { orderId, paypalOrderId },
                    { headers: { token } }
                );

                if (response.data.success) {
                    setCartItems({});
                    toast.success("Thanh toán thành công!");
                    navigate("/orders");
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.error(error);
                toast.error("Xác minh thanh toán thất bại!");
            }
        };

        verifyPaypal();
    }, [location, backendUrl, token, setCartItems, navigate]);

    return <div>Đang xác minh thanh toán...</div>;
};

export default VerifyPaypal;