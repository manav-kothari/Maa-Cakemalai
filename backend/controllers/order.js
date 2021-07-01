const { Order, ProductCart } = require("../models/order");
const asyncHandler = require("express-async-handler");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "NO order found in DB",
        });
      }
      req.order = order;
      next();
    });
};

exports.getOrder = (req, res) => {
  return res.json(req.order);
};

exports.getOrdersOfUser = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;
  const pageSize = 15;

  const populateorders = req.query.userId
    ? {
        path: "user",
        match: {
          _id: req.query.userId,
        },
      }
    : { path: "" };

  Order.find({})
    .populate({ ...populateorders })
    .sort([["createdAt", "-1"]])

    .exec(function (
      err,
      orders,
      page = Number(req.query.pageNumber) || 1,
      pages
    ) {
      orders = orders.filter(function (order) {
        return order._id;
      });

      if (err) {
        return res.status(400).json({
          error: "NO Orders FOUND!",
        });
      }
      count = orders.length;

      res.json({
        orders: orders.slice(pageSize * (page - 1), pageSize * page),
        page,
        pages: Math.ceil(count / pageSize),
      });
    });
});

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save your order in DB",
      });
    }
    res.json(order);
  });
};

exports.getAllOrders = (req, res) => {
  const page = Number(req.query.pageNumber) || 1;
  const pageSize = 15;
  Order.find()
    .sort([["_id", "-1"]])
    .populate("user", "_id name")
    .exec(function (
      err,
      order,
      page = Number(req.query.pageNumber) || 1,
      pages
    ) {
      if (err) {
        return res.status(400).json({
          error: "No orders found in DB",
        });
      }
      count = order.length;
      res.json({
        order: order.slice(pageSize * (page - 1), pageSize * page),
        page,
        pages: Math.ceil(count / pageSize),
      });
    });
};

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Cannot update order status",
        });
      }
      res.json(order);
    }
  );
};
