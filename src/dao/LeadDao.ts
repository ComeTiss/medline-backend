import { LeadQueryOptions } from "graphql/types/queryTypes";
import Lead from "../db/models/Lead";
import { LeadInput } from "../graphql/types/leadTypes";
import QueryUtils from "../utils/queryUtils";

export default {
  async create(lead: LeadInput) {
    return Lead.create(lead);
  },

  async update(lead: LeadInput) {
    if (!lead?.id) {
      return null;
    }
    await Lead.update(lead, {
      where: { id: lead.id },
    });
    return Lead.findByPk(lead.id);
  },

  async deleteByIds(ids: Array<number>, authorId: number): Promise<Array<Lead>> {
    if (ids == null || ids.length === 0 || authorId == null) {
      throw new Error("Invalid request content");
    }
    const values = { deletedAt: Date.now() };
    const where = { authorId, id: ids };
    await Lead.update(values, { where });
    return Lead.findAll({ where });
  },

  async getAllLeads(request: LeadQueryOptions) {
    const options = request?.options;
    const authorId = request?.filters?.authorId;
    const whereId = authorId ? { authorId } : null;
    const params = {
      ...QueryUtils.pagination(options),
      where: {
        deletedAt: null,
        ...whereId,
      },
    };
    return Lead.findAll(params);
  },
};
