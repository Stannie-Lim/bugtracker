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

router.post("/:projectId", isLoggedIn, async (req, res, next) => {
  const { projectId } = req.params;
  const { info, type, priority } = req.body;
  try {
    const _type = type.toUpperCase().split(" ").join("_");
    const _priority = priority.toUpperCase();
    const ticket = await Ticket.create({
      type: _type,
      priority: _priority,
      info,
      projectId,
      userId: null,
      status: "OPEN",
    });
    res.status(201).json(ticket);
  } catch (err) {
    next(err);
  }
});
