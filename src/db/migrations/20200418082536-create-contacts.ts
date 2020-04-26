import {
  QueryInterface,
  DataTypes,
} from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize) => queryInterface.createTable("contacts", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    type: {
      type: new DataTypes.ENUM("PHONE_NUMBER", "WHATSAPP", "WECHAT", "SKYPE"),
      allowNull: false,
    },
    value: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }),

  down: (queryInterface: QueryInterface, Sequelize) => queryInterface.dropTable("contacts"),
};
