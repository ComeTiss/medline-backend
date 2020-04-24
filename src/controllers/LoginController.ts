import UserDao from "../dao/UserDao";
import { forgeJwt } from "../utils/auth/jwtUtils";
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
        EmailUtils.sendUserMailConfirmation({
          destinator: {
            name: email,
            email,
          },
          token,
        });
        return res.status(403).send({
          error: "Waiting to confirm email adress",
          requireEmailValidation: true,
        });
      }

      delete user.dataValues.password;
      // TODO (lzi): pass token in cookie with right configuration in next iteration
      // res.cookie("access_token", token, { maxAge, httpOnly: true });
      return res.status(200).send({ user, token });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Server internal error" });
    }
  },
};

export default controller;
