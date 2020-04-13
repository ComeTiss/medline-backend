import User from "../db/models/User";

const controller = {
  async handleLogin(req, res) {
    const data = {
      message: "Login not implemented yet",
    };
    return res.status(200).send(data);
  },
};

export default controller;
