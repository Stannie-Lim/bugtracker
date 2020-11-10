const db = require("./db");

const {
  User,
  Project,
  Ticket,
  TicketHistory,
  ProjectInvite,
} = require("./models/relations");

module.exports = {
  db,
  User,
  Project,
  Ticket,
  TicketHistory,
  ProjectInvite,
};
