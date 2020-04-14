
import UserDao from "../dao/UserDao";
import { forgeJwt } from "../utils/auth";
import { MAX_AGE as maxAge } from "../utils/config";


export default {
  async handleSignup(req, res) {
    const { body } = req;
    if (!body || !body.email) return res.status(403).send({ error: "Invalid request" });
    try {
      const existingUser = await UserDao.findOneByEmail(body.email);
      if (existingUser) {
        return res.status(401).send({
          error: "This email is already used.",
        });
      }
      const user = await UserDao.create(body);
      const token = await forgeJwt(user.dataValues);
      delete user.dataValues.password;
      res.cookie("access_token", token, { maxAge, httpOnly: true });
      return res.status(200).send({ user });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },
};
