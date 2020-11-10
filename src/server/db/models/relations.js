const User = require("./User");
const Ticket = require("./Ticket");
const Project = require("./Project");
const TicketHistory = require("./TicketHistory");
const ProjectInvite = require("./ProjectInvite");

User.belongsToMany(Project, {
  through: "UserProject",
});

Project.belongsToMany(User, {
  through: "UserProject",
});

Project.hasMany(Ticket);
Ticket.belongsTo(Project);

User.hasMany(ProjectInvite, { as: "inviter", foreignKey: "inviterId" });
User.hasMany(ProjectInvite, { as: "invitee", foreignKey: "inviteeId" });
ProjectInvite.belongsTo(User, { as: "inviter", foreignKey: "inviterId" });
ProjectInvite.belongsTo(User, { as: "invitee", foreignKey: "inviteeId" });
ProjectInvite.belongsTo(Project);

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
  ProjectInvite,
};
