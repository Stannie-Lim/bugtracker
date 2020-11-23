const dotenv = require("dotenv");
dotenv.config();

console.log(process.env.NODE_ENV);

const Sequelize = require("sequelize");
const db = new Sequelize(
  process.env.NODE_ENV !== "development"
    ? (process.env.DB_SCHEMA || "postgres",
      process.env.DB_USER || "postgres",
      process.env.DB_PASSWORD || "",
      {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 5432,
        dialect: "postgres",
        dialectOptions: {
          ssl: process.env.DB_SSL == "true",
        },
      })
    : (process.env.DATABASE_URL || "postgres://localhost/bug_tracker",
      { dialect: "postgres", logging: false })
);

module.exports = db;
