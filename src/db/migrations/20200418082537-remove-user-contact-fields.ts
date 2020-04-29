import {
  QueryInterface,
  DataTypes,
} from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize) => queryInterface.removeColumn("users", "contactID")
    .then(() => {
      queryInterface.removeColumn("users", "contactType");
    }),

  down: (queryInterface: QueryInterface, Sequelize) => queryInterface.addColumn("users", "contactID", {
    type: new DataTypes.STRING(128),
    allowNull: true,
  }).then(() => {
    queryInterface.addColumn("users", "contactType", {
      type: new DataTypes.STRING(128),
      allowNull: true,
    });
  }),
};
