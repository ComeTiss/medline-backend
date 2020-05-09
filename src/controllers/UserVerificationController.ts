
import { decodeJwt, forgeJwt } from "../utils/auth/jwtUtils";
import UserDao from "../dao/UserDao";
import EmailUtils from "../utils/email/emailUtils";
import User from "../db/models/User";

const URL_DEV = "http://localhost:3000"; // or 3001
const URL_PROD = "https://www.medline.io";
const REDIRECT_URL = process.env.NODE_ENV === "production" ? URL_PROD : URL_DEV;

export default {
  async sendEmailConfirmation(req, res) {
    try {
      if (!req?.body || !req?.body?.email) {
        return res.status(403).send({
          error: "Forbidden request",
        });
      }
      const { email } = req.body;
      const user = await UserDao.findOneByEmail(email);
      if (!user) {
        return res.status(401).send({
          error: "Invalid email adress",
        });
      }
      if (user.verifiedAt) {
        return res.status(401).send({
          error: "User already verified",
        });
      }

      const token = await forgeJwt(user);
      EmailUtils.sendUserMailConfirmation({
        destinator: {
          name: email,
          email,
        },
        token,
      });

      return res.status(200).send({
        message: "Successfull email request",
        email,
      });
    } catch {
      return res.status(500).send({
        error: "Internal error occured",
      });
    }
  },

  async verifyUser(req, res) {
    try {
      if (!req?.params?.token) {
        return res.status(403).send({
          error: "Forbidden request",
        });
      }
      const user = (await decodeJwt(req.params.token)) as User;
      if (user == null) {
        return res.status(401).send({
          error: "Failed to verfiy user.",
        });
      }
      await UserDao.update({ ...user, verifiedAt: Date.now() }, user.id);
      return res.redirect(`${REDIRECT_URL}/login`);
    } catch {
      return res.status(500).send({
        error: "Internal error ocurred.",
      });
    }
  },
};
