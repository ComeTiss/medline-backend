import { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt";

import sequelize from "./index";
import Lead from "./Lead";
import Need from "./Need";
import Organization from "./Organization";
import { enumToStrArr } from "../../utils/utils";
import { Civility } from "../../graphql/types/userTypes";

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

    public civility!: string;

    public displayEmail!: string;

    public organizationId!: number;

    public isAdmin!: boolean;

    public whatsapp!: string;

    public skype!: string;

    public wechat!: string;

    public phoneNumber!: string;

    public zoom!: string;

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
  civility: {
    type: new DataTypes.ENUM(...enumToStrArr(Civility)),
    allowNull: true,
  },
  displayEmail: {
    type: new DataTypes.STRING(256),
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
  skype: {
    type: new DataTypes.STRING(128),
    allowNull: true,
  },
  whatsapp: {
    type: new DataTypes.STRING(128),
    allowNull: true,
  },
  phoneNumber: {
    type: new DataTypes.STRING(128),
    allowNull: true,
  },
  wechat: {
    type: new DataTypes.STRING(128),
    allowNull: true,
  },
  zoom: {
    type: new DataTypes.STRING(128),
    allowNull: true,
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

User.hasOne(Organization, {
  sourceKey: "organizationId",
  foreignKey: "id",
  as: "organization",
});
