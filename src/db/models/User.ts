import { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt";

import sequelize from "./index";
import Lead from "./Lead";
import Need from "./Need";
import Contact from "./Contact";
import Organization from "./Organization";

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

    public functionTitle!: string;

    public contactID!: string;

    public contactType!: string;

    public organizationId!: number;

    public isAdmin!: boolean;

    public verifiedAt!: Date;

    public deletedAt!: Date;

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
  functionTitle: {
    type: new DataTypes.STRING(128),
    allowNull: false,
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
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
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
  hooks: {
    beforeCreate: hashPassword,
    beforeUpdate: hashPassword,
  },
  tableName: "users",
  sequelize,
});

User.hasMany(Lead, {
  sourceKey: "id",
  foreignKey: "authorId",
  as: "leads",
});

User.hasMany(Need, {
  sourceKey: "id",
  foreignKey: "authorId",
  as: "needs",
});

User.hasMany(Contact, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "contacts",
});

User.hasOne(Organization, {
  sourceKey: "organizationId",
  foreignKey: "id",
  as: "organization",
});
