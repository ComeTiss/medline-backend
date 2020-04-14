import User from "../db/models/User";
import { forgeJwt } from "../utils/auth";

const controller = {
  async handleLogin(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });
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
      return res.status(200).send({ auth: true, id: user.id, token });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Server internal error" });
    }
  },
};

export default controller;
