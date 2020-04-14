import Lead from "../db/models/Lead";
import { LeadInput } from "../graphql/types/leadTypes";

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

  async deleteByIds(ids: Array<number>): Promise<boolean> {
    if (ids == null || ids.length === 0) {
      return false;
    }
    return Lead.destroy({
      where: {
        id: ids,
      },
    });
  },

  async getAllLeads() {
    return Lead.findAll();
  },
};
