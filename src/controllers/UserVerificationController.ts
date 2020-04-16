
import { decodeJwt } from "../utils/auth/jwtUtils";
import UserDao from "../dao/UserDao";

const URL_DEV = "http://localhost:3001"; // or 3000
const URL_PROD = "https://medline-frontend.herokuapp.com";
const REDIRECT_URL = process.env.NODE_ENV === "production" ? URL_PROD : URL_DEV;

export default {
  async verifiyUser(req, res) {
    try {
      if (!req?.params?.token) {
        return res.status(403).send({
          error: "Forbidden request",
        });
      }
      const user = await decodeJwt(req.params.token);
      if (user == null) {
        return res.status(401).send({
          error: "Failed to verfiy user.",
        });
      }
      await UserDao.updateUser({ ...user, verifiedAt: Date.now() });
      return res.redirect(`${REDIRECT_URL}/login`);
    } catch {
      return res.send(500).send({
        error: "Internal error ocurred.",
      });
    }
  },
};
