import {
  QueryInterface,
  DataTypes,
} from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize) => queryInterface.addColumn("users", "deletedAt", {
    type: DataTypes.DATE,
    allowNull: true,
  }).then(() => queryInterface.addColumn("needs", "deletedAt", {
    type: DataTypes.DATE,
    allowNull: true,
  }).then(() => queryInterface.addColumn("leads", "deletedAt", {
    type: DataTypes.DATE,
    allowNull: true,
  }).then(() => queryInterface.addColumn("organizations", "deletedAt", {
    type: DataTypes.DATE,
    allowNull: true,
  })))),

  down: (queryInterface: QueryInterface, Sequelize) => queryInterface.removeColumn("users", "deletedAt")
    .then(() => queryInterface.removeColumn("needs", "deletedAt"))
    .then(() => queryInterface.removeColumn("leads", "deletedAt"))
    .then(() => queryInterface.removeColumn("organizations", "deletedAt")),
};
