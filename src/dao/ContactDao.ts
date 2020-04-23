import Sanitizer from "../utils/Sanitizer";
import Contact, { ContactType } from "../db/models/Contact";
import QueryUtils from "../utils/queryUtils";
import { ContactQueryOptions, ContactInput } from "../graphql/types/contactTypes";

const ContactDao = {

  async create(payload: Contact, userId: number) {
    const {
      type,
      value,
    } = payload;
    if (!ContactType[type] || !Sanitizer.isValidStr(value)) {
      return null;
    }
    if (userId == null) {
      throw new Error("Creation failed: missing 'userId'");
    }
    return Contact.create({ ...payload, userId });
  },

  async update(payload: ContactInput, userId: number) {
    if (!Sanitizer.isValidInt(payload?.id)) {
      throw new Error("Invalid request content");
    }
    await Contact.update(payload, {
      where: { id: payload.id, userId },
    });
    return Contact.findByPk(payload.id);
  },

  async deleteByIds(ids: Array<number>, userId: number) {
    if (ids == null || ids.length <= 0) {
      throw new Error("Invalid request content");
    }
    const values = { deletedAt: Date.now() };
    const where = { id: ids, userId };
    await Contact.update(values, { where });
    return this.findAll({ where });
  },

  async getWithOptions(request: ContactQueryOptions) {
    const options = request?.options;
    const contactId = request?.filters?.contactId;

    const whereId = contactId ? { id: contactId } : null;
    const params = {
      ...QueryUtils.pagination(options),
      where: {
        deletedAt: null,
        ...whereId,
      },
    };
    return Contact.findAll(params);
  },
};

export default ContactDao;
