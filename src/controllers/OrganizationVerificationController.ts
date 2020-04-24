
import { decodeJwt } from "../utils/auth/jwtUtils";
import OrganizationDao from "../dao/OrganizationDao";
import Organization from "../db/models/Organization";

export default {
  async verifiyOrganization(req, res) {
    try {
      if (!req?.params?.token) {
        return res.status(403).send({
          error: "Forbidden request",
        });
      }
      const org = (await decodeJwt(req.params.token)) as Organization;
      if (org == null) {
        return res.status(401).send({
          error: "Failed to verfiy organization.",
        });
      }
      const values = { ...org, verifiedAt: Date.now(), id: String(org.id) };
      const updatedRow = await OrganizationDao.update(values);
      if (updatedRow === 0) {
        return res.status(400).send("Verification Failed");
      }
      return res.status(200).send("Organization verfied successfully");
    } catch (error) {
      return res.status(500).send({
        error: "Internal error ocurred.",
      });
    }
  },
};
