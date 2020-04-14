import dotenv from "dotenv";

dotenv.config();

const DIALECT = "postgres";
const DEV_HOST = "localhost";
const DEV_USERNAME = "user1";
const DEV_PASSWORD = "pass";

export default {
  development: {
    username: DEV_USERNAME,
    password: DEV_PASSWORD,
    database: "medline_dev",
    host: DEV_HOST,
    dialect: DIALECT,
  },
  test: {
    username: DEV_USERNAME,
    password: DEV_PASSWORD,
    database: "medline_test",
    host: DEV_HOST,
    dialect: DIALECT,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: DIALECT,
  },
};
