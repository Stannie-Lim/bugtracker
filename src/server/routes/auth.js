const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const router = require("express").Router();
module.exports = router;

const { generateJWT, checkPassword } = require("../common/auth");
const { isLoggedIn } = require("../common/middleware");

// models
const { User, ProjectInvite, Project } = require("../db/models");

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

router.get("/user", async (req, res, next) => {
  if (req.token) {
    res.send(req.token);
  } else {
    res.send("");
  }
});

router.post("/logout", async (req, res, next) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.sendStatus(200);
});

router.get("/me", isLoggedIn, async (req, res, next) => {
  try {
    const { email } = req.user;
    const user = await User.findOne({
      where: { email },
      attributes: {
        exclude: ["password"],
      },
      include: {
        model: ProjectInvite,
        as: "invitee",
        foreignKey: "inviteeId",
        include: [
          {
            model: User,
            as: "inviter",
            attributes: {
              exclude: ["password"],
            },
          },
          {
            model: Project,
          },
        ],
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
    const _user = await User.findByPk(id);
    await _user.update({ cardOrder: order });
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ["password"],
      },
      include: {
        model: ProjectInvite,
        as: "invitee",
        foreignKey: "inviteeId",
        include: [
          {
            model: User,
            as: "inviter",
            attributes: {
              exclude: ["password"],
            },
          },
          {
            model: Project,
          },
        ],
      },
    });
    res.send(user);
  } catch (err) {
    next(err);
  }
});
