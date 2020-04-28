import {
  QueryInterface,
  DataTypes,
} from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize) => queryInterface.addColumn("organizations", "activity", {
    type: new DataTypes.STRING(128),
    allowNull: false,
    defaultValue: "",
  })
    .then(() => {
      queryInterface.addColumn("organizations", "address", {
        type: new DataTypes.STRING(256),
        allowNull: false,
        defaultValue: "",
      });
    }),

  down: (queryInterface: QueryInterface, Sequelize) => queryInterface.removeColumn("organizations", "activity").then(() => {
    queryInterface.removeColumn("users", "address");
  }),
};
