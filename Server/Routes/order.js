const express = require("express");
const router = express.Router();

const orderController = require("../Controllers/orderController");

router.post('/add-order',orderController.addOrder);
router.post('/get-orders',orderController.getOrders);
router.post('/change-status',orderController.changeStatus);
router.post('/cancel-order',orderController.cancelOrder);




module.exports=router;
