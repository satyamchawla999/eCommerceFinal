const Order = require("../Model/orders");
const Product = require("../Model/products");

module.exports.addOrder = async (req, res) => {
    let { coupon,quantity,units,sales,pUid } = req.body;
    // console.log("units",units,typeof(units));
    // console.log("sales",sales,typeof(sales));
    if(coupon === '') req.body.coupon = "NA"
    try {

        let product = await Product.findOne({uid:pUid});
        let oldSales = product.sales;

        product.sales = oldSales+(sales);

        let oldUnits = product.units;
        product.units = oldUnits + units;
        product.markModified("sales");
        product.markModified("units");
        product.save();
        let order = await Order.create(req.body);
        return res.status(201).send("order placed");
    } catch (err) {
        console.error(err);
        res.statusMessage = "An error occurred in deleting cart items.";
        return res.status(500).end();
    }
}

module.exports.cancelOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete({_id:req.body._id});
        return res.status(201).send("order cancel");
    } catch (err) {
        console.error(err);
        res.statusMessage = "An error occurred in deleting cart items.";
        return res.status(500).end();
    }
}

module.exports.getOrders = async (req, res) => {
    const {role,uid,display} = req.body;

    try {
        let orders = [];
        if(role === "Vendor") {
            orders = await Order.find({vUid:uid});
        }
        if (role === "Customer") {
            orders = await Order.find({cUid:uid});
        } 
        if (role === "Admin") {
            orders = await Order.find({});
        }
        if(display === "Your Orders"){
            orders = await Order.find({cUid:uid});
        }
        return res.status(201).send(orders);
    } catch (err) {
        console.error(err);
        res.statusMessage = "An error occurred in deleting cart items.";
        return res.status(500).end();
    }
}

module.exports.changeStatus = async (req, res) => {
    const {_id,status} = req.body;

    try {
        let orders = await Order.findOne({_id:_id});
        orders.status = status;
        orders.markModified("status");
        orders.save()
        return res.status(201).send(orders);
    } catch (err) {
        console.error(err);
        res.statusMessage = "An error occurred in deleting cart items.";
        return res.status(500).end();
    }
}