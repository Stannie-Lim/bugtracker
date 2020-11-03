const { User, Project, Ticket } = require("../src/server/db/models");
const faker = require("faker");

describe("Models relationships", () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const password = faker.internet.password();
  const firstName2 = faker.name.firstName();
  const lastName2 = faker.name.lastName();
  const email2 = faker.internet.email();
  const password2 = faker.internet.password();
  it("Creates users", async () => {
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

    const user2 = await User.create({
      firstName: firstName2,
      lastName: lastName2,
      email: email2,
      password: password2,
      admin: true,
    });
  });

  const projectName = faker.lorem.word();
  const projectDescription = faker.lorem.sentence();
  const projectName2 = faker.lorem.word();
  const projectDescription2 = faker.lorem.sentence();
  const projectName3 = faker.lorem.word();
  const projectDescription3 = faker.lorem.sentence();
  const projectName4 = faker.lorem.word();
  const projectDescription4 = faker.lorem.sentence();
  it("Creates projects", async () => {
    const project1 = await Project.create({
      title: projectName,
      description: projectDescription,
    });

    const project2 = await Project.create({
      title: projectName2,
      description: projectDescription2,
    });

    project3 = await Project.create({
      title: projectName3,
      description: projectDescription3,
    });

    project4 = await Project.create({
      title: projectName4,
      description: projectDescription4,
    });

    expect(project1.title).toEqual(projectName);
    expect(project2.title).toEqual(projectName2);
    expect(project3.title).toEqual(projectName3);
    expect(project4.title).toEqual(projectName4);
  });

  const type = "BUG";
  const status = "OPEN";
  const priority = "NONE";
  const info = faker.lorem.paragraph();
  it("Creates tickets", async () => {
    const ticket = await Ticket.create({ type, status, priority, info });
    expect(ticket.type).toEqual(type);
    expect(ticket.status).toEqual(status);
    expect(ticket.priority).toEqual(priority);
    expect(ticket.info).toEqual(info);
  });

  it("Assigns project to user", async () => {
    const user1 = await User.findOne({
      where: { firstName, lastName, email, password },
    });
    let project1 = await Project.findOne({
      where: { title: projectName, description: projectDescription },
    });
    await user1.addProject(project1);
    project1 = await Project.findOne({
      where: { title: projectName, description: projectDescription },
    });
    expect(project1.userId).toEqual(user1.id);
  });

  it("Assigns ticket to project", async () => {
    const project1 = await Project.findOne({
      where: { title: projectName, description: projectDescription },
    });
    const ticket = await Ticket.findOne({
      where: { type, status, priority, info },
    });
    await ticket.update({ projectId: project1.id });
    expect(ticket.projectId).toEqual(project1.id);
  });

  it("Assigns ticket to user", async () => {
    const user1 = await User.findOne({
      where: { firstName, lastName, email, password },
    });
    const ticket = await Ticket.findOne({
      where: { type, status, priority, info },
    });
    await ticket.update({ userId: user1.id });
    expect(ticket.userId).toEqual(user1.id);
  });
});
