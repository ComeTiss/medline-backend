
import UserDao from "../dao/UserDao";
import { forgeJwt } from "../utils/auth/jwtUtils";
import EmailUtils from "../utils/email/emailUtils";
import Sanitizer from "../utils/Sanitizer";
import OrganizationDao from "../dao/OrganizationDao";

export default {
  async handleSignup(req, res) {
    try {
      const { body } = req;
      if (!Sanitizer.isSignUpValid(body)) {
        return res.status(401).send({ error: "Invalid signup data" });
      }

      // Verify if user already exist
      const existingUser = await UserDao.findOneByEmail(body.email);
      if (existingUser) {
        return res.status(401).send({
          error: "This email is already used.",
        });
      }

      // Create new organization
      const orgInput = { ...body, name: body.organizationName };

      const org = await OrganizationDao.create(orgInput);
      if (!org) {
        return res.status(400).send({
          error: "Invalid body request: failed to create organization",
        });
      }

      // Create new user & send email confirmations (to user & admin)
      const user = await UserDao.create({ ...body, organizationId: org.id, displayEmail: body.email });
      if (!user) {
        await OrganizationDao.deleteByIds([org.id]);
        return res.status(400).send({
          error: "Invalid body request: failed to create user",
        });
      }
      const token = await forgeJwt(user.dataValues);
      EmailUtils.sendUserMailConfirmation({
        destinator: {
          name: `${body.firstName} + ${body.lastName}`,
          email: body.email,
        },
        token,
      });
      const tokenOrg = await forgeJwt(org);
      EmailUtils.sendOrganizationMailConfirmation(tokenOrg, org);

      delete user.dataValues.password;
      return res.status(200).send({ user });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },
};
