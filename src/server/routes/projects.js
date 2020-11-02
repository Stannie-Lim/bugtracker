const router = require("express").Router();
module.exports = router;

const { isLoggedIn } = require("../common/middleware");

// models
const { User, Project, Ticket } = require("../db/models");

// root route is /api/projects

router.get("/", isLoggedIn, async (req, res, next) => {
  const { id } = req.user;
  try {
    res.send(await Project.findAll({ where: { userId: id } }));
  } catch (err) {
    next(err);
  }
});
