import {
  QueryInterface,
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  SequelizeStatic,
  DataTypes,
} from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => queryInterface.createTable("users", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    lastName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    country: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    city: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    functionTitle: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    verifiedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    contactID: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    contactType: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    organizationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "organizations",
        key: "id",
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }),

  down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => queryInterface.dropTable("users"),
};
