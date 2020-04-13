import { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt";

import sequelize from "./index";

async function hashPassword(user: User) {
  const SALT_ROUNDS = 8;
  try {
    const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
    user.setDataValue("password", hashedPassword);
  } catch (error) {
    console.log(error);
  }
}

export default class User extends Model {
    public id!: number;

    public firstName!: string;

    public lastName!: string;

    public email!: string;

    public password!: string;

    public readonly createdAt!: Date;

    public readonly updatedAt!: Date;

    validatePassword(password) {
      return bcrypt.compare(password, this.password);
    }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
    unique: true,
    allowNull: false,
  },
  password: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
}, {
  hooks: {
    beforeCreate: hashPassword,
    beforeUpdate: hashPassword,
  },
  tableName: "users",
  sequelize,
});

User.sync({ force: false }).then(() => console.log("User table sync'ed"));
