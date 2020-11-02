const User = require("./User");
const Project = require("./Project");
const Ticket = require("./Ticket");

User.hasMany(Project);
Project.belongsToMany(User, {
  through: "project_admin",
  as: "admins",
  foreignKey: "adminId",
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
