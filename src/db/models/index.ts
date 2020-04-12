import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import configJson from "../config/config";

const basename = path.basename(__filename);
const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
const config = configJson[env];
const db = {};

let sequelize;

// DB Configurations
if (config.environment === "production") {
  // sequelize = new Sequelize(
  //   process.env[config.use_env_variable], config,
  // );
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

// Build DB models
fs
  .readdirSync(__dirname)
  .filter((file) => file.indexOf(".") !== 0 && (file !== basename)
     && (file.slice(-3) === ".ts" || file.slice(-3) === ".js"))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
db.sequelize = sequelize;
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
db.Sequelize = Sequelize;

export default db;
