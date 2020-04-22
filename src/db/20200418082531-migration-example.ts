import {
  QueryInterface,
  DataTypes,
} from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize) => queryInterface.addColumn("TABLE_NAME", "NEW_FIELD", {
    type: DataTypes.INTEGER,
    allowNull: false,
  }),

  down: (queryInterface: QueryInterface, Sequelize) => queryInterface.removeColumn("TABLE_NAME", "NEW_FIELD"),
};
