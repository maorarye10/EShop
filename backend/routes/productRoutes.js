const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/ProductModel");

const router = express.Router();

router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find();
    res.status(200).send(products);
  })
);

router.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct("category");
    res.status(200).send(categories);
  })
);

router.get(
  "/:token",
  expressAsyncHandler(async (req, res) => {
    const { token } = req.params;
    const product = await Product.findOne({ token });
    product
      ? res.status(200).send(product)
      : res.status(404).send({ message: "Product not found" });
  })
);

router.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findOne({ id });
    product
      ? res.status(200).send(product)
      : res.status(404).send({ message: "Product not found" });
  })
);

router.get(
  "/search",
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || "";
    const price = query.price || "";
    const rating = query.rating || "";
    const order = query.order || "";
    const searchQuery = query.query || "";

    const queryFilter =
      searchQuery && searchQuery !== "all"
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {};
    const categoryFilter =
      category && category !== "all"
        ? { category: { $regex: category, $options: "i" } }
        : {};
    const ratingFilter =
      rating && rating !== "all"
        ? { "rating.rate": { $gte: Number(rating) } }
        : {};
    const priceFilter =
      price && price !== "all"
        ? {
            price: {
              $gte: Number(price.split("-")[0]),
              $lte: Number(price.split("-")[1]),
            },
          }
        : {};

    const sortOrder =
      order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "toprated"
        ? { rating: 1 }
        : order === "newest"
        ? { createdAt: -1 }
        : { _id: -1 };

    const products = await Product.find({
      ...queryFilter,
      ...categoryFilter,
      ...ratingFilter,
      ...priceFilter,
    })
      .sort(sortOrder)
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    const countProducts = products.length;
    res.send({
      products,
      page,
      countProducts,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

module.exports = router;
