import { LeadQueryOptions } from "graphql/types/queryTypes";
import Lead from "../db/models/Lead";
import { LeadInput } from "../graphql/types/leadTypes";
import QueryUtils from "../utils/queryUtils";

export default {
  async create(lead: LeadInput, authorId: number) {
    if (authorId == null) {
      throw new Error("Creation failed: missing 'authorId'");
    }
    return Lead.create({ ...lead, authorId });
  },

  async update(lead: LeadInput, authorId: number) {
    if (!lead?.id || authorId == null) {
      throw new Error("Update failed: invalid input");
    }
    const updatedRows = await Lead.update(lead, {
      where: { id: lead.id, authorId },
    });
    if (updatedRows[0] === 0) {
      throw new Error("Update failed: invalid 'id' or 'authorId' ");
    }
    return Lead.findByPk(lead.id);
  },

  async deleteByIds(ids: Array<number>, authorId: number): Promise<Array<Lead>> {
    if (ids == null || ids.length === 0 || authorId == null) {
      throw new Error("Invalid request content");
    }
    const values = { deletedAt: Date.now() };
    const where = { authorId, id: ids };
    const updatedRows = await Lead.update(values, { where });
    if (updatedRows[0] === 0) {
      throw new Error("Delete failed: invalid 'ids' or 'authorId' ");
    }
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
