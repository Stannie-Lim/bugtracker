const router = require("express").Router();
module.exports = router;

const { isLoggedIn } = require("../common/middleware");

// models
const { User, Project, Ticket } = require("../db/models");

// root route is /api/projects

router.get("/", isLoggedIn, async (req, res, next) => {
  const userId = req.user.id;
  try {
    res.send(await Project.findAll({ where: { userId } }));
  } catch (err) {
    next(err);
  }
});
