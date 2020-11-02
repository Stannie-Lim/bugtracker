const bcrypt = require("bcrypt");

const { db, User, Project, Ticket } = require("../src/server/db/models");
const { generateJWT, checkPassword } = require("../src/server/common/auth");

const seed = async () => {
  await db.sync({ force: true });
  console.log("seeding");

  try {
    const hashedPassword = bcrypt.hashSync("test", 15);
    const user = await User.create({
      firstName: "test",
      lastName: "test",
      email: "test",
      password: hashedPassword,
    });

    const project = await Project.create({
      title: "Project 1",
      description: "Description for project 1",
    });

    await user.addProject(project);
    await project.setUsers(user);
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
