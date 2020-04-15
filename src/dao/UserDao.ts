import User from "../db/models/User";

const isValidStr = (input: string) => input != null && !!input.trim();

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
    if (!isValidStr(firstName)
        || !isValidStr(lastName)
        || !isValidStr(email)
        || !isValidStr(password)) {
      throw new Error("Invalid body request");
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
