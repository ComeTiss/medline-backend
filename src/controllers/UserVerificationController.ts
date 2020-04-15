
import { decodeJwt } from "../utils/auth/jwtUtils";
import UserDao from "../dao/UserDao";

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
      return res.status(200).send({
        message: "User has been verfied succesfully.",
      });
    } catch {
      return res.send(500).send({
        error: "Internal error ocurred.",
      });
    }
  },
};
