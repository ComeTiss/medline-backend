import User from "../db/models/User";

const UserDao = {
  async findOneByEmail(email: string) {
    return User.findOne({
      where: {
        email,
      },
    });
  },

  async create(payload) {
    if (!payload) throw new Error("Invalid body request");
    const {
      firstName, lastName, email, password,
    } = payload;
    if (!firstName || !lastName || !email || !password) throw new Error("Invalid body request");
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
};

export default UserDao;
