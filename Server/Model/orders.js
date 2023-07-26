const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
      imgUrl:{
        type: String,
        required: true,
      },
      cName:{
        type: String,
        required: true,
      },
      name:{
        type: String,
        required: true,
      },
      description:{
        type: String,
        required: true,
      },
      vName:{
        type: String,
        required: true,
      },
      price:{
        type: String,
        required: true,
      },
      pUid: {
        type: String,
        required: true,
      },
      cUid: {
        type: String,
        required: true,
      },
      vUid: {
        type: String,
        required: true,
      },
      address: {
        type: Object,
        required: true,
      },
      status: {
        type: String,
        required: true,
        default:"Successfull"
      },
      coupon: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      }
    },
    {
      timestamps: true,
    }
  );

  
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;