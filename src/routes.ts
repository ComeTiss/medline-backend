import UserVerificationController from "./controllers/UserVerificationController";
import LoginController from "./controllers/LoginController";
import SignupController from "./controllers/SignupController";

export default (app) => {
  app.post("/login", LoginController.handleLogin);
  app.post("/signup", SignupController.handleSignup);
  app.get("/verify/:token", UserVerificationController.verifiyUser);
};
