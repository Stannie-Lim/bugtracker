const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

dotenv.config();

const generateJWT = ({ firstName, lastName, id, email }) => {
  return jwt.sign(
    { firstName, lastName, id, email },
    process.env.JWT_SECRET || "YOUARETHECAUSEOFMYEUPHORIA"
  );
};

const checkPassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

module.exports = {
  generateJWT,
  checkPassword,
};
