const router = require("express").Router();
module.exports = router;

const { isLoggedIn } = require("../common/middleware");

// models
const { User, Project, Ticket } = require("../db/models");

// root route is /api/projects

router.get("/", isLoggedIn, async (req, res, next) => {
  const userId = req.user.id;
  try {
    const projects = await Project.findAll({
      include: {
        model: User,
        as: "users",
        attributes: {
          exclude: ["password"],
        },
      },
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
    const project = await Project.create({ title, description });
    await user.addProject(project);
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
      include: {
        model: User,
        as: "users",
        attributes: {
          exclude: ["password"],
        },
      },
    });
    res.send(project);
  } catch (err) {
    next(err);
  }
});

// test2
