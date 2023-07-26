const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const USER_PATH = path.join("/Users");

const userSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    imgUrl: [
      {
        type: String,
        required: true,
      },
    ],
    role: {
      type: String,
      required: true,
    },
    bName: {
      type: String,
      required: true,
    },
    bType: {
      type: String,
      required: true,
    },
    gNo: {
      type: String,
      required: true,
    },
    validation: {
      type: Boolean,
      default: true,
    },
    cart: [
      {
        type: Object,
        required: true,
      },
    ],
    address: [
      {
        type: Object,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", USER_PATH));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

userSchema.statics.uploadedImage = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5MB (adjust as needed)
  },
});

userSchema.statics.userPath = USER_PATH;

const User = mongoose.model("User", userSchema);

module.exports = User;
