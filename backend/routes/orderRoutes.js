const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Order = require("../models/OrderModel");
const { isAuth } = require("../util/jwtUtil");

const router = express.Router();

router.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const id = req.body.id;
    const order = await Order.findOne({ id });
    if (order) {
      return res.status(200).send(order);
    }
    res.status(404).send({ message: "Order not found" });
  })
);

router.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = Order.create({
      orderItems: req.body.orderItems.map((item) => ({
        product: item._id,
      })),
    });
  })
);

module.exports = router;
