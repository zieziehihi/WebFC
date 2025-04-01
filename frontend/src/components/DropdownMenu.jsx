import { useState, useEffect, useRef } from "react";

const DropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Ẩn menu khi click ra ngoài
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button className="px-4 py-2"
                onMouseEnter={() => setIsOpen(true)}
            >
            </button>
            {isOpen && (
                <div
                    className="absolute right-0 top-full mt-1 w-36 bg-slate-100 shadow-md rounded-md py-3 px-5"
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(true)}  // Không đóng khi rời chuột
                >
                    <p className="cursor-pointer hover:text-black">Hồ sơ</p>
                    <p className="cursor-pointer hover:text-black">Đơn hàng</p>
                    <p className="cursor-pointer hover:text-black">Đăng xuất</p>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;
