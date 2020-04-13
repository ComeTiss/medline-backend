import User from "../db/models/User";

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
      return res.status(200).send({ message: "Authentication successful" });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Server internal error" });
    }
  },
};

export default controller;
