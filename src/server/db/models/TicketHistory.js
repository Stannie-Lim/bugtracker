const { TEXT } = require("sequelize");
const Sequelize = require("sequelize");
const db = require("../db");
const { UUID, UUIDV4, INTEGER, STRING, VIRTUAL, BOOLEAN, ENUM } = Sequelize;

const TicketHistory = db.define("tickethistory", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  priority: {
    type: ENUM,
    values: ["NONE", "LOW", "MEDIUM", "HIGH"],
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  status: {
    type: ENUM,
    values: ["OPEN", "IN_PROGRESS", "RESOLVED", "CREATED"],
    defaultValue: "CREATED",
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = TicketHistory;
