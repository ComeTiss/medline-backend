import User from "../db/models/User";
import Sanitizer from "../utils/Sanitizer";
import QueryUtils from "../utils/queryUtils";
import { UserQueryOptions, UserInput } from "../graphql/types/userTypes";

const UserDao = {
  async findOneByEmail(email: string) {
    return User.findOne({
      where: {
        email,
      },
    });
  },

  async findOneById(id: number) {
    return User.findOne({
      where: {
        id,
      },
    });
  },

  async create(payload: UserInput) {
    if (!payload) return null;
    const {
      firstName,
      lastName,
      email,
      password,
      city,
      country,
      functionTitle,
    } = payload;
    if (!Sanitizer.isValidStr(firstName)
        || !Sanitizer.isValidStr(lastName)
        || !Sanitizer.isValidStr(email)
        || !Sanitizer.isValidStr(password)
        || !Sanitizer.isValidStr(city)
        || !Sanitizer.isValidStr(country)
        || !Sanitizer.isValidStr(functionTitle)) {
      return null;
    }
    try {
      const user = await User.create(payload);
      return user;
    } catch (err) {
      throw new Error(err);
    }
  },
  async update(payload) {
    if (!payload?.id) throw new Error("Invalid body request");
    const { id } = payload;
    await User.update(payload, {
      where: { id },
    });
    return User.findByPk(id);
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
    };
    return User.findAll(params);
  },
};

export default UserDao;
