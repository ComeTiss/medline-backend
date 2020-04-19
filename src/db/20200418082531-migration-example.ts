import {
  QueryInterface,
  DataTypes,
} from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize) => queryInterface.addColumn("needs", "urgencyLevel", {
    type: DataTypes.INTEGER,
    allowNull: false,
  }),

  down: (queryInterface: QueryInterface, Sequelize) => queryInterface.removeColumn("needs", "urgencyLevel"),
};
