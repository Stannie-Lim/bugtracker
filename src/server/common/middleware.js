const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const isLoggedIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.split("Bearer ")[1])
      return res.status(403).json({ message: "Forbidden" });

    const token = authHeader.split("Bearer ")[1];
    const user = jwt.verify(
      token,
      process.env.JWT_SECRET || "YOUARETHECAUSEOFMYEUPHORIA"
    );

    req.user = user;
    next();
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
};

module.exports = {
  isLoggedIn,
};
