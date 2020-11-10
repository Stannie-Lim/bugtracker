const User = require("./User");
const Ticket = require("./Ticket");
const Project = require("./Project");
const TicketHistory = require("./TicketHistory");

User.belongsToMany(Project, {
  through: "UserProject",
});

Project.belongsToMany(User, {
  through: "UserProject",
});

Project.hasMany(Ticket);
Ticket.belongsTo(Project);

Ticket.hasMany(TicketHistory);
TicketHistory.belongsTo(Ticket);

User.hasMany(TicketHistory);
TicketHistory.belongsTo(User);

User.hasMany(Ticket);
Ticket.belongsTo(User);

module.exports = {
  User,
  Project,
  Ticket,
  TicketHistory,
};
