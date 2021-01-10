const dotenv = require("dotenv");
dotenv.config();

const Sequelize = require("sequelize");

const productiondb = new Sequelize(
  process.env.DB_SCHEMA || "postgres",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: process.env.DB_SSL == "true",
    },
    logging: false,
  }
);

const developmentdb = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/bug_tracker"
);

const db = process.env.NODE_ENV === "production" ? productiondb : developmentdb;

module.exports = db;
