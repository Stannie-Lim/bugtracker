const bcrypt = require("bcrypt");
const router = require("express").Router();
module.exports = router;

const { generateJWT, checkPassword } = require("../common/auth");
const { isLoggedIn } = require("../common/middleware");

// models
const { User } = require("../db/models");

// root route is /api/auth

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(403).json({ message: "No user exists " });
    }

    const hashedPassword = user.password;
    const isCorrectPassword = checkPassword(password, hashedPassword);

    if (!isCorrectPassword) {
      res.status(403).json({ message: "Invalid credentials" });
    }

    const { firstName, lastName, id } = user;
    const token = generateJWT({ firstName, lastName, id, email });
    res.send(token);
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  const { email, firstName, lastName, password } = req.body;
  try {
    const tryToFindUser = await User.findOne({ where: { email } });

    if (tryToFindUser) {
      res.status(403).json({ message: "User already exists " });
    }

    const hashedPassword = bcrypt.hashSync(password, 15);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = generateJWT({
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id,
      email,
    });
    res.send(token);
  } catch (err) {
    next(err);
  }
});

router.get("/me", isLoggedIn, async (req, res, next) => {
  try {
    const { email } = req.user;
    const user = await User.findOne({
      where: { email },
      attributes: {
        exclude: ["password"],
      },
    });
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.post("/cardorder", isLoggedIn, async (req, res, next) => {
  const { order } = req.body;
  const { id } = req.user;
  try {
    const user = await User.findByPk(id);
    await user.update({ cardOrder: order });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
