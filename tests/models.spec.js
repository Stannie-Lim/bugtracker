const { User, Project, Ticket } = require("../src/server/db/models");
const faker = require("faker");

describe("Models relationships", () => {
  it("Successfully creates models", async () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const user1 = await User.create({
      firstName,
      lastName,
      email,
      password,
      admin: true,
    });
    expect(user1.firstName).toEqual(firstName);
    expect(user1.lastName).toEqual(lastName);
    expect(user1.email).toEqual(email);
    expect(user1.password).toEqual(password);
  });

  // it('Successfully adds project to user', async() => {
  //   const projectName = faker.lorem.word();
  //   const projectDescription = faker.lorem.sentence();
  //   const project1 = await Project.create({
  //     title: projectName,
  //     description: projectDescription
  //   });

  //   await user1.addProject(project1);
  //   expect(project1.adminId === user1.id);
  // });
});
