import { Model, DataTypes } from "sequelize";
import sequelize from "./index";

export default class Lead extends Model {
    public id!: number;

    public authorId: number;

    public itemName!: string;

    public specifications!: string;

    public quantity!: number;

    public cost!: number;

    public availableAt!: Date;

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
    allowNull: true,
  },
  itemName: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  specifications: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cost: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  availableAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: "leads",
  sequelize,
});
