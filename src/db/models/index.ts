import { Sequelize } from "sequelize";
import configJson from "../config/config";

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
const config = configJson[env];

function buildSequelize() {
  let sequelize;
  if (config.environment === "production") {
    sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS, {
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        dialect: "postgres",
        dialectOptions: {
          ssl: true,
          native: true,
        },
        logging: true,
      },
    );
  } else {
    sequelize = new Sequelize(
      config.database, config.username, config.password, config,
    );
  }
  return sequelize;
}

export default buildSequelize();
