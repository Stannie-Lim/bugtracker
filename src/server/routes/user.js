const router = require("express").Router();
const { generateJWT, checkPassword } = require("../common/auth");
module.exports = router;

const { isLoggedIn } = require("../common/middleware");

// models
const {
  User,
  Project,
  Ticket,
  TicketHistory,
  ProjectInvite,
} = require("../db/models");

// root route is /api/user

router.post("/invite/:projectId", isLoggedIn, async (req, res, next) => {
  const { projectId } = req.params;
  const { userToInvite } = req.body;
  const { id } = req.user;
  try {
    console.log(projectId, userToInvite, id);
    const _userToInvite = await User.findOne({
      where: { email: userToInvite },
    });
    if (!_userToInvite) {
      return res.status(500).json({ message: "User not found" });
    }
    if (_userToInvite.id === id) {
      return res.status(500).json({ message: "You cannot invite yourself" });
    }

    const invite = await ProjectInvite.create({
      inviterId: id,
      inviteeId: _userToInvite.id,
      projectId,
    });

    const user = await User.findByPk(id, {
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

router.put("/edit/name", isLoggedIn, async (req, res, next) => {
  const { firstName, lastName } = req.body;
  const { id } = req.user;
  try {
    const _user = await User.findByPk(id);
    await _user.update({ firstName, lastName });
    const user = await User.findByPk(id, {
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

router.put("/edit/email", isLoggedIn, async (req, res, next) => {
  const { email } = req.body;
  const { id } = req.user;
  try {
    const _user = await User.findByPk(id);

    // TODO send email verification

    await _user.update({ email });
    const user = await User.findByPk(id, {
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

router.put("/edit/password", isLoggedIn, async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.user;
  try {
    const _user = await User.findByPk(id);

    const correctPassword = checkPassword(oldPassword, _user.password);
    if (!correctPassword) {
      res.status(401).json({ message: "Incorrect password" });
    } else {
      const password = bcrypt.hashSync(newPassword, 15);
      await _user.update({ password });
      const user = await User.findByPk(id, {
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
    }
  } catch (err) {
    next(err);
  }
});
