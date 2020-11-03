const router = require("express").Router();
module.exports = router;

const { isLoggedIn } = require("../common/middleware");

// models
const { User, Project, Ticket } = require("../db/models");

// root route is /api/tickets

router.get("/", isLoggedIn, async (req, res, next) => {
  const userId = req.user.id;
  try {
    const userAssignedProjects = new Set(
      await Project.findAll({ where: { userId } }).map((project) => project.id)
    );
    const allTickets = await Ticket.findAll();
    const userAvailableTickets = allTickets.filter(({ projectId }) =>
      userAssignedProjects.has(projectId)
    );
    res.send(userAvailableTickets);
  } catch (err) {
    next(err);
  }
});
