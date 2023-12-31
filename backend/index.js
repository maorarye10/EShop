const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoutes");
const seedRouter = require("./routes/seedRoutes");
const orderRouter = require("./routes/orderRoutes");
const productRouter = require("./routes/productRoutes");

dotenv.config();
const PORT = process.env.PORT;
const DBURL = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/seed", seedRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/products", productRouter);

mongoose
  .connect(DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful!");
    app.listen(PORT, () => {
      console.log(`Server started on port ${process.env.PORT}!`);
    });
  })
  .catch((err) => {
    console.log(`ERROR: ${err.message}`);
  });
