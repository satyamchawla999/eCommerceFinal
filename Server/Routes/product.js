const express = require("express");
const router = express.Router();
const Product = require("../Model/products");

const productController = require("../Controllers/productController");

router.post(
  "/add-product",
  Product.uploadedProduct.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
  ]),
  productController.addProduct
);

router.post(
  "/update-product",
  Product.uploadedProduct.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
  ]),
  productController.updateProduct
);


router.get(
  "/get-product",
  productController.getProduct
);

router.post(
  "/delete",
  productController.deleteProduct
);

router.post(
  "/get-single-product",
  productController.getSingleProduct
);



module.exports = router;
