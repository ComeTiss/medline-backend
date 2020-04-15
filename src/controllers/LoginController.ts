import UserDao from "../dao/UserDao";
import { forgeJwt } from "../utils/auth/jwtUtils";
import { MAX_AGE as maxAge } from "../utils/auth/config";
import EmailUtils from "../utils/email/emailUtils";
import Sanitizer from "../utils/Sanitizer";

const controller = {
  async handleLogin(req, res) {
    const { email, password } = req.body;
    try {
      if (!Sanitizer.isLoginValid(req.body)) {
        return res.status(403).send({
          error: "Invalid request",
        });
      }
      const user = await UserDao.findOneByEmail(email);
      if (!user) {
        return res.status(401).send({
          error: "The login information was incorrect",
        });
      }
      const isPasswordValid = await user.validatePassword(password);
      if (!isPasswordValid) {
        return res.status(401).send({
          error: "The login information was incorrect",
        });
      }
      const token = await forgeJwt(user);

      if (user.verifiedAt == null) {
        EmailUtils.sendMailConfirmation({
          destinator: {
            name: email,
            email,
          },
          token,
        });
        return res.status(403).send({
          error: "Waiting to confirm email adress",
        });
      }

      delete user.dataValues.password;
      res.cookie("access_token", token, { maxAge, httpOnly: true });

      return res.status(200).send({ user });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Server internal error" });
    }
  },
};

export default controller;
