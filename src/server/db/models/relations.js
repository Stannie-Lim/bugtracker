const User = require("./User");
const Project = require("./Project");
const Ticket = require("./Ticket");

User.belongsToMany(Project, {
  through: "UserProject",
});

Project.belongsToMany(User, {
  through: "UserProject",
});

Project.hasMany(Ticket);
Ticket.belongsTo(Project);

User.hasMany(Ticket);
Ticket.belongsTo(User);

module.exports = {
  User,
  Project,
  Ticket,
};
