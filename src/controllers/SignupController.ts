
import UserDao from "../dao/UserDao";
import { forgeJwt } from "../utils/auth/jwtUtils";
import { MAX_AGE as maxAge } from "../utils/auth/config";
import EmailUtils from "../utils/email/emailUtils";
import Sanitizer from "../utils/Sanitizer";

export default {
  async handleSignup(req, res) {
    const { body } = req;
    if (!Sanitizer.isSignUpValid(body)) {
      return res.status(403).send({ error: "Invalid request" });
    }

    try {
      const existingUser = await UserDao.findOneByEmail(body.email);
      if (existingUser) {
        return res.status(401).send({
          error: "This email is already used.",
        });
      }
      const user = await UserDao.create(body);
      if (user == null) {
        return res.status(400).send({
          error: "Invalid body request",
        });
      }
      const token = await forgeJwt(user.dataValues);

      EmailUtils.sendMailConfirmation({
        destinator: {
          name: `${body.firstName} + ${body.lastName}`,
          email: body.email,
        },
        token,
      });

      delete user.dataValues.password;
      res.cookie("access_token", token, { maxAge, httpOnly: true });

      return res.status(200).send({ user });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },
};
