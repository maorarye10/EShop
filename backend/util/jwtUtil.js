const jwt = require("jsonwebtoken");

module.exports.generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_PASS,
    { expiresIn: "15d" }
  );
};

module.exports.isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_PASS, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid Token" });
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).json({ message: "No Token" });
  }
};
