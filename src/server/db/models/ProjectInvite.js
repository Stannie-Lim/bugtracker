const { TEXT } = require("sequelize");
const Sequelize = require("sequelize");
const db = require("../db");
const { UUID, UUIDV4, INTEGER, STRING, VIRTUAL, BOOLEAN, ENUM } = Sequelize;

const ProjectInvite = db.define("projectinvite", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  accepted: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

module.exports = ProjectInvite;
