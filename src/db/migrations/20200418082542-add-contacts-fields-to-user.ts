import {
  QueryInterface,
  DataTypes,
} from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize) => queryInterface.addColumn("users", "whatsapp", {
    type: new DataTypes.STRING(128),
    allowNull: true,
  })
    .then(() => {
      queryInterface.addColumn("users", "phoneNumber", {
        type: new DataTypes.STRING(128),
        allowNull: true,
      })
        .then(() => {
          queryInterface.addColumn("users", "skype", {
            type: new DataTypes.STRING(128),
            allowNull: true,
          })
            .then(() => {
              queryInterface.addColumn("users", "zoom", {
                type: new DataTypes.STRING(128),
                allowNull: true,
              })
                .then(() => {
                  queryInterface.addColumn("users", "wechat", {
                    type: new DataTypes.STRING(128),
                    allowNull: true,
                  });
                });
            });
        });
    }),

  down: (queryInterface: QueryInterface, Sequelize) => queryInterface.removeColumn("users", "whatsapp")
    .then(() => queryInterface.removeColumn("users", "phoneNumber")
      .then(() => queryInterface.removeColumn("users", "skype")
        .then(() => queryInterface.removeColumn("users", "zoom")
          .then(() => queryInterface.removeColumn("users", "wechat"))))),
};
