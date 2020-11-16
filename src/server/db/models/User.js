const Sequelize = require("sequelize");
const db = require("../db");
const { UUID, UUIDV4, INTEGER, STRING, VIRTUAL, BOOLEAN } = Sequelize;

const User = db.define("user", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: STRING,
    defaultValue:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png",
  },
  fullName: {
    type: VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`;
    },
  },
  admin: {
    type: BOOLEAN,
    defaultValue: false,
  },
  cardOrder: {
    type: Sequelize.ARRAY(INTEGER),
    defaultValue: [2, 1, 3, 4],
  },
  resolvedTickets: {
    type: INTEGER,
    defaultValue: 0,
  },
});

module.exports = User;
