const { Order } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((error, order) => {
      if (error) {
        return res.status(400).json({
          error: "Not able to find the order",
        });
      }
      req.order = order;
      next();
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((error, order) => {
    if (error) {
      return res.status(400).json({
        error: "Not able to place the order",
      });
    }
    res.json(order);
  });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((error, orders) => {
      if (error) {
        return res.status(400).json({
          error: "No orders found",
        });
      }
      return res.json(orders);
    });
};

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
  Order.update(
    {
      _id: req.body.orderId,
    },
    {
      $set: { status: req.body.status },
    },
    (error, order) => {
      if (error) {
        return res.status(400).json({
          error: "Failed to update status",
        });
      }
      res.json(order);
    }
  );
};
