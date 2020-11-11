const router = require("express").Router();
module.exports = router;

const { isLoggedIn } = require("../common/middleware");

// models
const { User, Project, Ticket, ProjectInvite } = require("../db/models");

// root route is /api/projects

router.get("/", isLoggedIn, async (req, res, next) => {
  const userId = req.user.id;
  try {
    const projects = await Project.findAll({
      include: [
        {
          model: User,
          as: "users",
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: Ticket,
        },
      ],
    }).filter(({ users }) => users.map((user) => user.id).includes(userId));
    res.send(projects);
  } catch (err) {
    next(err);
  }
});

router.post("/", isLoggedIn, async (req, res, next) => {
  const userId = req.user.id;
  const { title, description } = req.body;
  try {
    const user = await User.findByPk(userId);
    const _project = await Project.create({ title, description });
    await user.addProject(_project);

    const project = await Project.findByPk(_project.id, {
      include: [
        {
          model: User,
          as: "users",
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: Ticket,
        },
      ],
    });

    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
});

router.put("/:projectId", isLoggedIn, async (req, res, next) => {
  const { projectId } = req.params;
  const { userToInvite } = req.body;
  try {
    const user = await User.findOne({ where: { email: userToInvite } });
    if (!user) res.status(500).json({ message: "No user found " });

    const _project = await Project.findByPk(projectId, {
      include: {
        model: User,
        as: "users",
        attributes: {
          exclude: ["password"],
        },
      },
    });
    await _project.setUsers([..._project.users, user]);

    const project = await Project.findByPk(projectId, {
      include: [
        {
          model: User,
          as: "users",
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: Ticket,
        },
      ],
    });
    res.send(project);
  } catch (err) {
    next(err);
  }
});

router.post("/invitation/:id/decline", isLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    await ProjectInvite.destroy({ where: { id } });
    const user = await User.findOne({
      where: { id: userId },
      attributes: {
        exclude: ["password"],
      },
      include: {
        model: ProjectInvite,
        as: "invitee",
        foreignKey: "inviteeId",
        include: [
          {
            model: User,
            as: "inviter",
            attributes: {
              exclude: ["password"],
            },
          },
          {
            model: Project,
          },
        ],
      },
    });
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.post("/invitation/:id/accept", isLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const projectInvite = await ProjectInvite.findByPk(id);

    const _project = await Project.findByPk(projectInvite.projectId, {
      include: {
        model: User,
        as: "users",
        attributes: {
          exclude: ["password"],
        },
      },
    });

    await ProjectInvite.destroy({ where: { id } });
    const user = await User.findOne({
      where: { id: userId },
      attributes: {
        exclude: ["password"],
      },
      include: {
        model: ProjectInvite,
        as: "invitee",
        foreignKey: "inviteeId",
        include: [
          {
            model: User,
            as: "inviter",
            attributes: {
              exclude: ["password"],
            },
          },
          {
            model: Project,
          },
        ],
      },
    });
    await _project.setUsers([..._project.users, user]);

    const project = await Project.findByPk(projectInvite.projectId, {
      include: [
        {
          model: User,
          as: "users",
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: Ticket,
        },
      ],
    });

    res.send({
      user,
      project,
    });
  } catch (err) {
    next(err);
  }
});
