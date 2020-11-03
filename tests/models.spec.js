const { User, Project, Ticket } = require("../src/server/db/models");
const faker = require("faker");

describe("Models relationships", () => {
  it("Successfully creates models", async () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      admin: true,
    });
    expect(user.firstName).toEqual(firstName);
  });
});
