const router = require("express").Router();
module.exports = router;

const { isLoggedIn } = require("../common/middleware");

// models
const { User, Project, Ticket, TicketHistory } = require("../db/models");

// root route is /api/tickets

router.get("/", isLoggedIn, async (req, res, next) => {
  const userId = req.user.id;
  try {
    const userAssignedProjects = new Set(
      await Project.findAll({
        include: {
          model: User,
          as: "users",
          attributes: {
            exclude: ["password"],
          },
        },
      })
        .filter(({ users }) => users.map((user) => user.id).includes(userId))
        .map((project) => project.id)
    );
    const allTickets = await Ticket.findAll({
      include: [
        {
          model: Project,
        },
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: TicketHistory,
          include: {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
        },
      ],
      order: [[{ model: TicketHistory }, "updatedAt", "DESC"]],
    });
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
  const { id } = req.user;
  try {
    const _type = type.toUpperCase().split(" ").join("_");
    const _priority = priority.toUpperCase();
    const _ticket = await Ticket.create({
      type: _type,
      priority: _priority,
      info,
      projectId,
      userId: null,
      status: "OPEN",
    });

    await TicketHistory.create({
      priority: _ticket.priority,
      ticketId: _ticket.id,
      userId: id,
    });

    const ticket = await Ticket.findByPk(_ticket.id, {
      include: [
        {
          model: Project,
        },
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: TicketHistory,
          order: '"updatedAt" ASC',
          include: {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
        },
      ],
      order: [[{ model: TicketHistory }, "updatedAt", "DESC"]],
    });

    res.status(201).json(ticket);
  } catch (err) {
    next(err);
  }
});

router.put("/:ticketId/assign", isLoggedIn, async (req, res, next) => {
  const { ticketId } = req.params;
  const { userId } = req.body;
  const { id } = req.user;
  try {
    const _ticket = await Ticket.findByPk(ticketId);
    const user = await User.findByPk(userId);
    await _ticket.update({ userId: user.id, status: "IN_PROGRESS" });

    await TicketHistory.create({
      priority: _ticket.priority,
      status: "IN_PROGRESS",
      ticketId: _ticket.id,
      userId: id,
    });

    const ticket = await Ticket.findByPk(ticketId, {
      include: [
        {
          model: Project,
        },
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: TicketHistory,
          order: '"updatedAt" ASC',
          include: {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
        },
      ],
      order: [[{ model: TicketHistory }, "updatedAt", "DESC"]],
    });

    res.send(ticket);
  } catch (err) {
    next(err);
  }
});

router.put("/:ticketId/unassign", isLoggedIn, async (req, res, next) => {
  const { ticketId } = req.params;
  const { userId } = req.body;
  const { id } = req.user;
  try {
    const _ticket = await Ticket.findByPk(ticketId);
    const user = await User.findByPk(userId);
    if (_ticket.userId !== user.id)
      res.status(403).json({
        message: `You are not authorized to unassign ${user.fullName} from ticket`,
      });

    await _ticket.update({ userId: null, status: "OPEN" });

    await TicketHistory.create({
      priority: _ticket.priority,
      status: "OPEN",
      ticketId: _ticket.id,
      userId: id,
    });

    const ticket = await Ticket.findByPk(ticketId, {
      include: [
        {
          model: Project,
        },
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: TicketHistory,
          order: '"updatedAt" ASC',
          include: {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
        },
      ],
      order: [[{ model: TicketHistory }, "updatedAt", "DESC"]],
    });
    res.send(ticket);
  } catch (err) {
    next(err);
  }
});

router.put("/:ticketId/resolve", isLoggedIn, async (req, res, next) => {
  const { ticketId } = req.params;
  const { userId } = req.body;
  const { id } = req.user;
  try {
    const _ticket = await Ticket.findByPk(ticketId);
    const user = await User.findByPk(userId);
    if (_ticket.userId !== user.id)
      res
        .status(403)
        .json({ message: `You are not authorized to resolve this ticket` });

    await _ticket.update({
      userId: null,
      status: "RESOLVED",
      priority: "NONE",
    });

    await TicketHistory.create({
      priority: "NONE",
      status: "RESOLVED",
      ticketId: _ticket.id,
      userId: id,
    });

    const ticket = await Ticket.findByPk(ticketId, {
      include: [
        {
          model: Project,
        },
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: TicketHistory,
          order: '"updatedAt" ASC',
          include: {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
        },
      ],
      order: [[{ model: TicketHistory }, "updatedAt", "DESC"]],
    });
    res.send(ticket);
  } catch (err) {
    next(err);
  }
});
