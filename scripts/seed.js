const bcrypt = require("bcrypt");

const {
  db,
  User,
  Project,
  Ticket,
  TicketHistory,
  ProjectInvite,
} = require("../src/server/db/models");
const { generateJWT, checkPassword } = require("../src/server/common/auth");

const seed = async () => {
  await db.sync({ force: true });
  console.log("seeding");

  try {
    const hashedPassword = bcrypt.hashSync("test", 15);
    const user = await User.create({
      firstName: "test1",
      lastName: "test",
      email: "test",
      password: hashedPassword,
    });

    const user2 = await User.create({
      firstName: "test2",
      lastName: "test2",
      email: "test2",
      password: hashedPassword,
    });

    const project = await Project.create({
      title: "Project 1",
      description: "Description for project 1",
    });

    const project2 = await Project.create({
      title: "Project 2",
      description: "Description for project 2",
    });

    const invite = await ProjectInvite.create({
      inviterId: user2.id,
      inviteeId: user.id,
      projectId: project2.id,
    });

    await project.setUsers(user.id);
    await project2.setUsers(user2.id);

    const ticket = await Ticket.create({
      type: "BUG",
      priority: "MEDIUM",
      status: "OPEN",
      info: "Ticket1 for project1",
      projectId: project.id,
      userId: null,
    });

    const ticket1History = await TicketHistory.create({
      priority: ticket.priority,
      ticketId: ticket.id,
      userId: user.id,
    });

    const ticket2 = await Ticket.create({
      type: "FEATURE_REQUEST",
      priority: "HIGH",
      status: "IN_PROGRESS",
      info: "Ticket2 for project1",
      projectId: project.id,
      userId: user.id,
    });

    const ticket2History = await TicketHistory.create({
      priority: ticket2.priority,
      ticketId: ticket2.id,
      userId: user.id,
    });

    const ticket3 = await Ticket.create({
      type: "TO-DO",
      priority: "NONE",
      status: "RESOLVED",
      info: "Ticket1 for project2",
      projectId: project2.id,
      userId: null,
    });
  } catch (err) {
    console.log(err);
  }

  console.log("closing db connection");
  await db.close();
  console.log("db closed");
};

if (module === require.main) {
  seed();
}
