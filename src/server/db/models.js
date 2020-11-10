const db = require("./db");

const { User, Project, Ticket, TicketHistory } = require("./models/relations");

module.exports = {
  db,
  User,
  Project,
  Ticket,
  TicketHistory,
};
