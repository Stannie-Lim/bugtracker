const dotenv = require("dotenv");
dotenv.config();

const Sequelize = require("sequelize");

const productionSequelize = new Sequelize(
  process.env.DB_SCHEMA || "postgres",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: process.env.DB_SSL,
    },
  }
);

const developmentSequelize = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/bug_tracker",
  { logging: false }
);

console.log(productionSequelize);

const db =
  process.NODE_ENV === "production"
    ? productionSequelize
    : developmentSequelize;

module.exports = db;
