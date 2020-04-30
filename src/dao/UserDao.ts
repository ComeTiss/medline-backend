import User from "../db/models/User";
import Organization from "../db/models/Organization";
import Sanitizer from "../utils/Sanitizer";
import QueryUtils from "../utils/queryUtils";
import { Civility, UserQueryOptions, UserInput } from "../graphql/types/userTypes";

async function comparePassword(userId, oldPassword) {
  const user = await User.findByPk(userId);
  return user.validatePassword(oldPassword);
}

const UserDao = {
  async findOneByEmail(email: string) {
    return User.findOne({
      where: {
        email,
      },
    });
  },

  async findOneById(id: number) {
    return User.findByPk(id);
  },

  async create(payload: UserInput) {
    if (!payload) return null;
    const {
      firstName,
      lastName,
      email,
      displayEmail,
      password,
      functionTitle,
      civility,
    } = payload;
    if (!Sanitizer.isValidStr(firstName)
        || !Sanitizer.isValidStr(lastName)
        || !Sanitizer.isValidEmail(email)
        || !Sanitizer.isValidStr(password)
        || !Sanitizer.isValidStr(functionTitle)
        || (civility && !Sanitizer.isValidEnum(civility, Civility))
        || (displayEmail && !Sanitizer.isValidEmail(displayEmail))) {
      throw new Error("Invalid body request");
    }
    try {
      const user = await User.create(payload);
      return user;
    } catch (err) {
      throw new Error(err);
    }
  },
  async update(payload, userId: number) {
    if (!userId) throw new Error("Invalid body request");

    if (payload.newPassword && !comparePassword(userId, payload.oldPassword)) throw new Error("Invalid password");
    else {
      return User.update({ ...payload, password: payload.newPassword }, {
        where: { id: userId },
      });
    }

    const updatedRows = await User.update(payload, {
      where: { id: userId },
    });
    if (updatedRows[0] === 0) {
      throw new Error("Update failed: invalid user provided");
    }
    return User.findByPk(userId);
  },

  async getWithOptions(request: UserQueryOptions) {
    const options = request?.options;
    const userId = request?.filters?.userId;
    // TODO (Come): see if we want to send non-verified users

    // let where;
    // if (userId) {
    //   where = { id: userId, verifiedAt: { $ne: null } };
    // } else {
    //   where = { verifiedAt: { $ne: null } };
    // }
    const whereId = userId ? { id: userId } : null;
    const params = {
      ...QueryUtils.pagination(options),
      where: {
        ...whereId,
      },
      include: [{ model: Organization, as: "organization" }],
    };

    return User.findAll(params);
  },
};

export default UserDao;
