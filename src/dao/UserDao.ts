import User from "../db/models/User";
import Sanitizer from "../utils/Sanitizer";

const UserDao = {
  async findOneByEmail(email: string) {
    return User.findOne({
      where: {
        email,
      },
    });
  },

  async create(payload) {
    if (!payload) return null;
    const {
      firstName, lastName, email, password,
    } = payload;
    if (!Sanitizer.isValidStr(firstName)
        || !Sanitizer.isValidStr(lastName)
        || !Sanitizer.isValidStr(email)
        || !Sanitizer.isValidStr(password)) {
      return null;
    }
    try {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
      });
      return user;
    } catch (err) {
      throw new Error(err);
    }
  },
  async updateUser(payload) {
    if (!payload?.id) throw new Error("Invalid body request");
    const { id } = payload;
    User.update(payload, {
      where: { id },
    });
    return User.findByPk(id);
  },
};

export default UserDao;
