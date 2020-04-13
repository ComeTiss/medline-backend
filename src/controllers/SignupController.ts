
import User from "../db/models/User";

export default {
  async handleSignup(req, res) {
    const { body } = req;
    if (!body) return res.status(403).send({ error: "Invalid request" });
    const {
      firstName, lastName, email, password,
    } = body;
    try {
      const existingUser = await User.findOne({
        where: {
          email,
        },
      });
      if (existingUser) {
        return res.status(401).send({
          message: "This email is already used.",
        });
      }
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password,
      });
      return res.status(200).send(newUser);
    } catch (error) {
      return res.status(500).send(error.errors);
    }
  },
};
