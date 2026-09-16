const ProductModel = require("../Models/Product");

const createProduct = async (req, res) => {
    try {
        const { name, price, category, quantity, description } = req.body;
        const createdBy = req.user._id;
        const product = new ProductModel({
            name,
            price,
            category,
            quantity,
            description,
            createdBy
        });
        await product.save();

        return res.status(201).json({
            message: "Product created successfully",
            success: true,
            product
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }

};

const getProducts = async (req, res) => {
    try {
         const search = req.query.search || "";
          // Pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
const totalProducts = await ProductModel.countDocuments({
    createdBy: req.user._id,
    $or: [
        {
            name: {
                $regex: search,
                $options: "i"
            }
        },
        {
            category: {
                $regex: search,
                $options: "i"
            }
        }
    ]
});
        const products = await ProductModel.find({ 
            createdBy: req.user._id ,
             $or: [
                {
                    name: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    category: {
                        $regex: search,
                        $options: "i"
                    }
                },
                   
            ]
            
        })
        .skip(skip)
            .limit(limit);


        // Calculate total pages
        const totalPages = Math.ceil(totalProducts / limit);
        return res.status(200).json({
            message: "Products fetched successfully",
            success: true,
             products,
             currentPage: page,
            limit,
            totalProducts,
            totalPages
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

const updateProduct = async (req, res) => {
    try {
           const { id } = req.params;
        const { name, price, category, quantity, description } = req.body;
           const userId = req.user._id;
          const updatedProduct = await ProductModel.findOneAndUpdate(
            {
                _id: id,
                createdBy: userId
            },
            {
                name,
                price,
                category,
                quantity,
                description
            },
            {
                new: true
            }
        );

        // Product not found OR product doesn't belong to this user
        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Success
        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct
        });

    }
    catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};
const deleteProduct = async (req, res) => {
    try {
           const { id } = req.params;
  const userId = req.user._id;
          const deletedProduct  = await ProductModel.findOneAndDelete(
            {
                _id: id,
                createdBy: userId
            });

        // Product not found OR product doesn't belong to this user
        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Success
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            product: deletedProduct
        });

    }
    catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};
module.exports = {
    createProduct,getProducts,updateProduct,deleteProduct
};