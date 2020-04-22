import {
  QueryInterface,
  DataTypes,
} from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize) => queryInterface.removeColumn("users", "city")
    .then(() => {
      queryInterface.removeColumn("users", "country");
    }),

  down: (queryInterface: QueryInterface, Sequelize) => queryInterface.addColumn("users", "city", {
    type: new DataTypes.STRING(128),
    allowNull: false,
  }).then(() => {
    queryInterface.addColumn("users", "country", {
      type: new DataTypes.STRING(128),
      allowNull: false,
    });
  }),
};
