const router = require("express").Router();
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
