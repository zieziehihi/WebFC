import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

// ADD 
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, sizes, bestseller } = req.body;

        // Xử lý sizes một cách an toàn
        let parsedSizes;

        if (typeof sizes === 'string') {
            try {
                parsedSizes = JSON.parse(sizes);
                if (!Array.isArray(parsedSizes)) {
                    return res.json({ success: false, message: "Sizes phải là một mảng" });
                }
            } catch (error) {
                return res.json({ success: false, message: "Invalid sizes format. Định dạng hợp lệ: [\"S\", \"M\", \"L\"]" });
            }

        } else if (Array.isArray(sizes)) {
            parsedSizes = sizes; // Nếu sizes đã là mảng, không cần parse

        } else {
            return res.json({ success: false, message: "Sizes phải là một mảng hoặc chuỗi JSON hợp lệ" });
        }

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            bestseller: bestseller === 'true' ? true : false,
            sizes: parsedSizes,
            image: imagesUrl,
            date: Date.now()
        };

        console.log(productData);

        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: 'Đã thêm sản phẩm' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// LIST 
const listProducts = async (req, res) => {

    try {
        const products = await productModel.find({});
        res.json({ success: true, products });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// UPDATE
const updateProduct = async (req, res) => {
    try {
        const { productId, name, description, price, category, sizes, bestseller } = req.body;

        // Log để kiểm tra dữ liệu nhận được
        console.log("Received sizes:", sizes);

        // Xử lý sizes một cách an toàn
        let parsedSizes;
        if (sizes === undefined || sizes === null) {
            return res.json({ success: false, message: "Sizes không được để trống" });
        }
        if (typeof sizes === 'string') {
            try {
                parsedSizes = JSON.parse(sizes);
                if (!Array.isArray(parsedSizes)) {
                    return res.json({ success: false, message: "Sizes phải là một mảng" });
                }
            } catch (error) {
                return res.json({ success: false, message: "Invalid sizes format. Định dạng hợp lệ: [\"S\", \"M\", \"L\"]" });
            }
        } else if (Array.isArray(sizes)) {
            parsedSizes = sizes;
        } else {
            return res.json({ success: false, message: "Sizes phải là một mảng hoặc chuỗi JSON hợp lệ" });
        }

        const product = await productModel.findById(productId);
        if (!product) return res.json({ success: false, message: "Sản phẩm không tồn tại" });

        // Xử lý ảnh nếu có ảnh mới
        const imageFiles = [req.files.image1, req.files.image2, req.files.image3, req.files.image4].filter(Boolean);
        let imagesUrl = product.image; // Giữ ảnh cũ

        if (imageFiles.length > 0) {
            imagesUrl = await Promise.all(imageFiles.map(async (file) => {
                const result = await cloudinary.uploader.upload(file[0].path, { resource_type: 'image' });
                return result.secure_url;
            }));
        }

        // Cập nhật sản phẩm
        product.name = name;
        product.description = description;
        product.price = Number(price);
        product.category = category;
        product.sizes = parsedSizes;
        product.bestseller = bestseller === 'true';
        product.image = imagesUrl;
        product.date = Date.now();

        await product.save();
        res.json({ success: true, message: 'Cập nhật sản phẩm thành công' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// REMOVE
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: 'Đã xoá sản phẩm' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// SINGLE PRODUCT
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        res.json({ success: true, product });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { listProducts, addProduct, updateProduct, removeProduct, singleProduct };