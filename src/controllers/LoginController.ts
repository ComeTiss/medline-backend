import UserDao from "../dao/UserDao";
import { forgeJwt } from "../utils/auth";
import { MAX_AGE as maxAge } from "../utils/config";

const controller = {
  async handleLogin(req, res) {
    const { email, password } = req.body;
    try {
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
