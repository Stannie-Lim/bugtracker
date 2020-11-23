const qs = require("qs");
const axios = require("axios");
// const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
module.exports = router;

// dotenv.config();

const { generateJWT, checkPassword } = require("../../common/auth");
const { isLoggedIn } = require("../../common/middleware");

// models
const { User } = require("../../db/models");

// root route is /api/oauth/github

router.get("/login", async (req, res, next) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`;
  res.redirect(url);
});

router.get("/callback", async (req, res, next) => {
  const { code } = req.query;
  try {
    const payload = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    };
    const { data } = await axios.post(
      `https://github.com/login/oauth/access_token`,
      payload
    );
    const { access_token } = qs.parse(data);
    const user = (
      await axios.get("https://api.github.com/user", {
        headers: { Authorization: `token ${access_token}` },
      })
    ).data;
    const email = user.login;
    const [firstName, lastName] = user.name.split(" ");
    const password = bcrypt.hashSync(user.node_id, 15);

    let _user = await User.findOne({ where: { email } });
    if (!_user) {
      _user = await User.create({
        firstName,
        lastName,
        email,
        password,
      });
    }
    const token = generateJWT({
      firstName: firstName,
      lastName: lastName,
      id: _user.id,
      email,
    });

    res.cookie("jwt", token, {
      httpOnly: true, // This flag helps prevent cross site scripting (xss) attacks by not allowing javascript to access this cookie
      // Read more here: https://owasp.org/www-community/HttpOnly
    });
    // We've successfully authenticated now redirect back to the front end server
    res.redirect("http://localhost:3000");
  } catch (err) {
    next(err);
  }
});
