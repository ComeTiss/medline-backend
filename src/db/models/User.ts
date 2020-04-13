import { Model, DataTypes } from "sequelize";

import sequelize from "./index";

export default class User extends Model {
    public id!: number;

    public email!: string;

    public password!: string;

    public readonly createdAt!: Date;

    public readonly updatedAt!: Date;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  password: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
}, {
  tableName: "users",
  sequelize,
});

User.sync({ force: false }).then(() => console.log("User table created"));
