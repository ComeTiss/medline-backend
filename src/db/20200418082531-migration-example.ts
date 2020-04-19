import {
  QueryInterface,
  DataTypes,
} from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize) => queryInterface.addColumn("NEW_FIELD", "TABLE_NAME", {
    type: DataTypes.INTEGER,
    allowNull: false,
  }),

  down: (queryInterface: QueryInterface, Sequelize) => queryInterface.removeColumn("NEW_FIELD", "TABLE_NAME"),
};
