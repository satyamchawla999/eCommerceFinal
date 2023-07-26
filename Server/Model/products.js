const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const PRODUCT_PATH = path.join("/Products");

const productSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    imgUrl: [{
      type: String,
      required: true,
    }],
    subCategory: {
      type: String,
      required: true,
    },
    vName: {
      type: String,
      required: true,
    },
    sales: {
      type: Number,
      default: 0
    },
    units: {
      type: Number,
      default: 0
    },
    vUid: {
      type: String,
      required: true,
    },
    brandName: {
      type: String,
      required: true,
    },
    draft: {
      type: Boolean,
      required: true,
    },
    stock: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  }
);

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", PRODUCT_PATH));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

productSchema.statics.uploadedProduct = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5MB (adjust as needed)
  },
})

productSchema.statics.productPath = PRODUCT_PATH;

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
