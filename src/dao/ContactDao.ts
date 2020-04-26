import Sanitizer from "../utils/Sanitizer";
import Contact from "../db/models/Contact";
import QueryUtils from "../utils/queryUtils";
import { ContactQueryOptions, ContactInput, ContactType } from "../graphql/types/contactTypes";

const ContactDao = {

  async create(payload: Contact, userId: number) {
    const {
      type,
      value,
    } = payload;
    if (!ContactType[type] || !Sanitizer.isValidStr(value)) {
      throw new Error("Creation failed: invalid contact input");
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
    const updatedRowsCount = await Contact.update(payload, {
      where: { id: payload.id, userId },
    });
    if (!updatedRowsCount) throw new Error("Contact update failed: userId and/or Ids didn't match any record");
    return Contact.findByPk(payload.id);
  },

  async deleteByIds(ids: Array<number>, userId: number) {
    if (ids == null || ids.length <= 0) {
      throw new Error("Invalid request content");
    }
    const values = { deletedAt: Date.now() };
    const where = { id: ids, userId };
    const deletedRowsCount = await Contact.update(values, { where });
    if (!deletedRowsCount) throw new Error("Contact delete failed: userId and/or Ids didn't match any record");
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
