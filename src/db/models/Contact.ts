import { Model, DataTypes } from "sequelize";

import sequelize from "./index";

export default class Contact extends Model {
    public id!: number;

    public userId!: string;

    public type!: string;

    public value!: string;

    public deletedAt!: Date;

    public readonly createdAt!: Date;

    public readonly updatedAt!: Date;
}

export enum ContactType {
  PHONE_NUMBER = "PHONE_NUMBER",
  WHATSAPP = "WHATSAPP",
  WECHAT = "WECHAT",
  SKYPE = "SKYPE"
}

Contact.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
}, {
  tableName: "contacts",
  sequelize,
});
