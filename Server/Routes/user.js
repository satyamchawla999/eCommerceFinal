const express = require("express");
const router = express.Router();
const User = require("../Model/users");

const userController = require("../Controllers/userController");


router.post("/get-users", userController.getUsers);
router.post("/validate-vendor", userController.validateVendor);
router.post("/sign-up", userController.signUp);
router.post("/sign-in", userController.signIn);
router.post("/add-address", userController.addAddress);
router.post("/get-address", userController.getAddress);
router.post("/add-cart", userController.addCart);
router.post("/get-cart-items", userController.getCartItems);
router.post("/set-user-role", userController.setUserRole);
router.post("/delete-items", userController.deleteItems);
router.post("/empty-cart", userController.emptyCart);

router.post(
  "/update-profile",
  User.uploadedImage.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  userController.updateProfile
);

module.exports = router;
