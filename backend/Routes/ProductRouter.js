const router = require("express").Router();

const ensureAuthenticated = require("../Middlewares/Auth");
const { createProduct ,getProducts,updateProduct,deleteProduct} = require("../Controllers/ProductController");

//Create Product
router.post("/", ensureAuthenticated, createProduct);

// GET PRODUCTS
router.get("/",ensureAuthenticated, getProducts);

//Update Product
router.put("/:id", ensureAuthenticated, updateProduct);
router.delete("/:id", ensureAuthenticated, deleteProduct);
module.exports = router;