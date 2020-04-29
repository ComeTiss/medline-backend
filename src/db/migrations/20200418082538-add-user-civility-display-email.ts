import {
  QueryInterface,
  DataTypes,
} from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize) => queryInterface.addColumn("users", "civility", {
    type: new DataTypes.ENUM("Ms.", "Mr.", "Dr."),
    allowNull: true,
  })
    .then(() => {
      queryInterface.addColumn("users", "displayEmail", {
        type: new DataTypes.STRING(256),
        allowNull: false,
        defaultValue: "null",
      });
    }),

  down: (queryInterface: QueryInterface, Sequelize) => queryInterface.removeColumn("users", "civility").then(() => {
    queryInterface.removeColumn("users", "displayEmail");
  })
    .then(() => queryInterface.sequelize.query("DROP TYPE \"enum_users_civility\";")),
};
