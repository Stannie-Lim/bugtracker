const qs = require("qs");
const axios = require("axios");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { google } = require("googleapis");
const router = require("express").Router();
module.exports = router;

dotenv.config();

const { generateJWT, checkPassword } = require("../../common/auth");
const { isLoggedIn } = require("../../common/middleware");

// models
const { User } = require("../../db/models");

// root route is /api/oauth/google

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/api/oauth/google/callback"
);

router.get("/login", async (req, res, next) => {
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ];

  const client = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: scopes, // If you only need one scope you can pass it as string
  });

  res.redirect(client);
  // const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`;
  // res.redirect(url);
});

router.get("/callback", async (req, res, next) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    const { access_token } = tokens;
    const user = (
      await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        { headers: { Authorization: `Bearer ${code}` } }
      )
    ).data;
    const email = user.email;
    const [firstName, lastName] = user.name.split(" ");
    const password = bcrypt.hashSync(user.id, 15);

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
