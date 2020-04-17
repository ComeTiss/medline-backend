import Sanitizer from "../utils/Sanitizer";
import Organization from "../db/models/Organization";
import QueryUtils from "../utils/queryUtils";
import { OrganizationQueryOptions } from "../graphql/types/organizationTypes";

const OrganizationDao = {

  async create(payload: Organization) {
    const {
      name,
      address,
      city,
      country,
      activity,
    } = payload;
    if (!Sanitizer.isValidStr(name)
        || !Sanitizer.isValidStr(address)
        || !Sanitizer.isValidStr(city)
        || !Sanitizer.isValidStr(country)
        || !Sanitizer.isValidStr(activity)) {
      return null;
    }
    return Organization.create(payload);
  },

  async update(payload) {
    if (!Sanitizer.isValidInt(payload?.id)) {
      throw new Error("Invalid request content");
    }
    await Organization.update(payload, {
      where: { id: payload.id },
    });
    return this.findOneById(payload.id);
  },

  async deleteByIds(ids: Array<number>) {
    if (ids == null || ids.length <= 0) {
      throw new Error("Invalid request content");
    }
    await Organization.destroy({
      where: { id: ids },
    });
    return true;
  },

  async getWithOptions(request: OrganizationQueryOptions) {
    const options = request?.options;
    const organizationId = request?.filters?.organizationId;
    // TODO (Come): see if we want to send non-verified organizations

    // let where;
    // if (organizationId) {
    //   where = { id: organizationId, verifiedAt: { $ne: null } };
    // } else {
    //   where = { verifiedAt: { $ne: null } };
    // }

    const params = {
      ...QueryUtils.pagination(options),
      where: organizationId ? { id: organizationId } : null,
    };
    return Organization.findAll(params);
  },
};

export default OrganizationDao;
