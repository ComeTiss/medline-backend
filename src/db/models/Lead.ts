import { Model, DataTypes } from "sequelize";
import sequelize from "./index";

export default class Lead extends Model {
    public id!: number;

    public authorId!: number;

    public itemName!: string;

    public quantity!: number;

    public cost!: number;

    public specifications!: string;

    public availableAt!: Date;

    public deletedAt!: Date;

    public readonly createdAt!: Date;

    public readonly updatedAt!: Date;
}

Lead.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  itemName: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cost: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  specifications: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  availableAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: "leads",
  sequelize,
});
