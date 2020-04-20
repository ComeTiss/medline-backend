import UserDao from "../../dao/UserDao";
import Sanitizer from "../../utils/Sanitizer";

async function updateUser(root, args, context) {
  const { request } = args;
  const { email: newEmail } = request;
  const { id } = context;

  if (newEmail) {
    if (!Sanitizer.isValidStr(newEmail)) throw new Error("Invalid request content");

    const currentUser = await UserDao.findOneById(id);
    if (currentUser.email !== newEmail) {
      const existingOtherUser = await UserDao.findOneByEmail(newEmail);
      if (existingOtherUser) {
        throw new Error("An account already exist for this email");
      }
      return UserDao.update({ id, email: newEmail, verifiedAt: null });
    }
  }
  return UserDao.update(request);
}

async function getUsersWithOptions(root, args) {
  return UserDao.getWithOptions(args.request);
}

const resolvers = {
  Mutation: {
    updateUser,
  },
  Query: {
    getUsersWithOptions,
  },
};

export default resolvers;
