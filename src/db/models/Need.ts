import { Model, DataTypes } from "sequelize";
import sequelize from "./index";

export default class Need extends Model {
    public id!: number;

    public authorId: number;

    public itemName!: string;

    public quantity!: number;

    public budget!: number;

    public limiteDate!: Date;

    public readonly createdAt!: Date;

    public readonly updatedAt!: Date;
}

Need.init({
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
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  budget: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  limiteDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: "needs",
  sequelize,
});
