import {
  QueryInterface,
  DataTypes,
} from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize) => queryInterface.addColumn("users", "civility", {
    type: new DataTypes.ENUM("Ms.", "Mr.", "Dr."),
    allowNull: false,
    defaultValue: "Mr.",
  })
    .then(() => {
      queryInterface.addColumn("users", "displayEmail", {
        type: new DataTypes.STRING(256),
        allowNull: true,
      });
    }),

  down: (queryInterface: QueryInterface, Sequelize) => queryInterface.removeColumn("users", "civility").then(() => {
    queryInterface.removeColumn("users", "displayEmail");
  }),
};
