'use strict';

const LoginController = require("./controllers/LoginController");
const SignupController = require("./controllers/SignupController");

module.exports = (app) => {
  app.post("/login",  LoginController.handleLogin);
  app.post("/signup", SignupController.handleSignup);
}

