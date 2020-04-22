import { Model, DataTypes } from "sequelize";

import sequelize from "./index";

export default class Organization extends Model {
    public id!: number;

    public name!: string;

    public country!: string;

    public city!: string;

    public verifiedAt!: Date;

    public deletedAt!: Date;

    public readonly createdAt!: Date;

    public readonly updatedAt!: Date;
}

Organization.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
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
  verifiedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: "organizations",
  sequelize,
});
