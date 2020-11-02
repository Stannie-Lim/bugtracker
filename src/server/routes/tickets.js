const router = require("express").Router();
module.exports = router;

const { isLoggedIn } = require("../common/middleware");

// models
const { User, Project, Ticket } = require("../db/models");

// root route is /api/tickets

router.get("/", isLoggedIn, async (req, res, next) => {
  const userId = req.user.id;
  try {
    res.send(await Ticket.findAll({ where: { userId } }));
  } catch (err) {
    next(err);
  }
});
