import UserDao from "../../dao/UserDao";
import { forgeJwt } from "../../utils/auth/jwtUtils";
import Sanitizer from "../../utils/Sanitizer";
import EmailUtils from "../../utils/email/emailUtils";

async function updateUser(root, args, context) {
  const { request } = args;
  const { email: newEmail } = request;
  const { id: userId } = context;

  if (newEmail) {
    if (!Sanitizer.isValidStr(newEmail)) throw new Error("Invalid request content");

    const currentUser = await UserDao.findOneById(userId);
    if (currentUser.email !== newEmail) {
      const existingOtherUser = await UserDao.findOneByEmail(newEmail);
      if (existingOtherUser) {
        throw new Error("An account already exist for this email");
      }
      try {
        const modifiedUser = await UserDao.update({ email: newEmail, verifiedAt: null }, userId);
        const token = await forgeJwt(modifiedUser);
        EmailUtils.sendUserMailConfirmation({
          destinator: {
            name: newEmail,
            email: newEmail,
          },
          token,
        });
        return modifiedUser;
      } catch (err) {
        console.error(err);
      }
    }
  }
  return UserDao.update(request, userId);
}

async function getUsersWithOptions(root, args) {
  return { users: UserDao.getWithOptions(args.request) };
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
