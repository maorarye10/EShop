const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");
const { generateToken, isAuth } = require("../util/jwtUtil");

const router = express.Router();

router.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.status(200).send({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user),
          });
          return;
        }
      }
      res.status(401).send({ message: "Invalid Email or Password" });
    } catch (error) {
      res
        .status(500)
        .send({
          message:
            "An error occured while trying to sign in. (api/users/signin)",
        });
    }
  })
);

router.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.status(401).send({ message: "Email already in use" });
      }

      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
      });
      return res.status(200).send({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token: generateToken(newUser),
      });
    } catch (error) {
      res
        .status(500)
        .send({
          message:
            "An error occured while trying to sign up. (api/users/signup)",
        });
    }
  })
);

router.get("/", isAuth, async (req, res) => {
  res.status(200).send({ message: "ok" });
});

module.exports = router;
