const { Router } = require("express");
const { getProducts, createProduct, updateProduct, deleteProduct } = require("../controllers/products");
const { createProductValidators, updateProductValidators, deleteProductValidators } = require("./validators");

const router = Router();

router.get("/", getProducts);

router.get("/:id", getProducts);

router.post("/", createProductValidators() ,createProduct);

router.put("/:id", updateProductValidators() , updateProduct);

router.delete("/:id", deleteProductValidators() , deleteProduct);


module.exports = router;