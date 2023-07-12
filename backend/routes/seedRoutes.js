const express = require("express");
const bcrypt = require("bcryptjs");
const Product = require("../models/ProductModel");
const User = require("../models/UserModel");
const Order = require("../models/OrderModel");
const data = require("../data");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    await Product.deleteMany({}); // delete by filter --> {} is all
    await Order.deleteMany({});
    await User.deleteMany({});
    const createdProducts = await Product.insertMany(data.products);
    const createdUsers = await User.insertMany(data.users);

    res.send({ createdProducts, createdUsers });
  } catch (error) {
    console.log(`failed to update: ${error.message}`);
  }
});

module.exports = router;
