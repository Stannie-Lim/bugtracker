const db = require("./db");

const { User, Project, Ticket } = require("./models/relations");

module.exports = {
  db,
  User,
  Project,
  Ticket,
};
