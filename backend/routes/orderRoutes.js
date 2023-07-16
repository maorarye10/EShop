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
    try {
      const newOrder = await Order.create({
        orderItems: req.body.orderItems.map((item) => ({
          //...item, //! this may be removed in the future
          product: item._id,
        })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      res.status(201).send({ message: "Order Created", order });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  })
);

module.exports = router;
