const router = require("express").Router();
module.exports = router;

const { isLoggedIn } = require("../common/middleware");

// models
const { User, Project, Ticket } = require("../db/models");

// root route is /api/tickets

router.get("/", isLoggedIn, async (req, res, next) => {
  const userId = req.user.id;
  try {
    const userAssignedProjects = await Project.findAll({ where: { userId } });
    const allTickets = await Ticket.findAll({ where: { userId } });
    const userAvailableTickets = allTickets.filter(
      (ticket) => !userAssignedProjects.includes(ticket.projectId)
    );
    res.send(userAvailableTickets);
  } catch (err) {
    next(err);
  }
});
