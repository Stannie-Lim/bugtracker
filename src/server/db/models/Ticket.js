const { TEXT } = require("sequelize");
const Sequelize = require("sequelize");
const db = require("../db");
const { UUID, UUIDV4, INTEGER, STRING, VIRTUAL, BOOLEAN, ENUM } = Sequelize;

const Ticket = db.define("ticket", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  type: {
    type: ENUM,
    values: ["BUG", "ERROR", "FEATURE_REQUEST", "TO-DO"],
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  status: {
    type: ENUM,
    values: ["OPEN", "IN_PROGRESS", "RESOLVED"],
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  priority: {
    type: ENUM,
    values: ["NONE", "LOW", "MEDIUM", "HIGH"],
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  info: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Ticket;
