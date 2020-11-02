const router = require("express").Router();
module.exports = router;

// root route is '/api'

router.get("/", async (req, res, next) => {
  res.send("/api route");
});

router.use("/auth", require("./routes/auth"));
router.use("/tickets", require("./routes/tickets"));
router.use("/projects", require("./routes/projects"));
