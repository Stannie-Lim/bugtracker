const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const cookieParser = require("cookie-parser");
module.exports = router;

router.use(cookieParser());
dotenv.config();

// root route is '/api'

router.use((req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        // If there is an error it means the token is either expired or invalid
        console.log("Token is invalid or expired. Deleting cookie.");
        // Try setting the expiresIn value to 5 seconds inside of jwt.sign() in the GET /github/callback route to see this in action
        res.cookie("jwt", "", {
          httpOnly: true,
          // Theres no way to delete cookies across domains so we set the expiration date to Date.now() so that it expires upon arrival
          expires: new Date(Date.now()),
        });
        // if the api and client are located on the same server you can use res.clearCookie('jwt') instead
      } else {
        // if token is valid, attach the decoded jwt payload to the request object
        req.token = token;
      }
      next();
    });
  } else {
    console.log("no token found, authentication failed");
    next();
  }
});

router.use("/user", require("./routes/user"));
router.use("/auth", require("./routes/auth"));
router.use("/tickets", require("./routes/tickets"));
router.use("/projects", require("./routes/projects"));
router.use("/oauth/github", require("./routes/oauth/github"));
router.use("/oauth/google", require("./routes/oauth/google"));
