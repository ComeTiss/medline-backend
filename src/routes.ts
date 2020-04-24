import UserVerificationController from "./controllers/UserVerificationController";
import LoginController from "./controllers/LoginController";
import SignupController from "./controllers/SignupController";
import OrganizationVerificationController
  from "./controllers/OrganizationVerificationController";

export default (app) => {
  app.post("/login", LoginController.handleLogin);
  app.post("/signup", SignupController.handleSignup);
  app.get("/verify/:token", UserVerificationController.verifiyUser);
  app.get("/verify-org/:token", OrganizationVerificationController.verifiyOrganization);
  app.post("/send-email", UserVerificationController.sendEmailConfirmation);
};
