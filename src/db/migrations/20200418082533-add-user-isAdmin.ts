import {
  QueryInterface,
  DataTypes,
} from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize) => queryInterface.addColumn("users", "isAdmin", {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }),

  down: (queryInterface: QueryInterface, Sequelize) => queryInterface.removeColumn("users", "isAdmin"),
};
