const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  const order = await Order.create({
    customerId: req.user.id,
    items: req.body.items,
    total: req.body.total,
    deliveryAddress: req.body.deliveryAddress
  });
  res.json(order);
};

exports.myOrders = async (req, res) => {
  res.json(await Order.find({ customerId: req.user.id }));
};

exports.trackOrder = async (req, res) => {
  res.json(await Order.findById(req.params.id));
};
