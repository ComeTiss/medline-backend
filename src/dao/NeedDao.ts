import Need from "../db/models/Need";
import { NeedInput } from "../graphql/types/needTypes";

export default {
  async create(need: NeedInput) {
    return Need.create(need);
  },

  async update(need: NeedInput) {
    if (!need?.id) {
      return null;
    }
    await Need.update(need, {
      where: { id: need.id },
    });
    return Need.findByPk(need.id);
  },

  async deleteByIds(ids: Array<number>): Promise<boolean> {
    if (ids == null || ids.length === 0) {
      return false;
    }
    return Need.destroy({
      where: {
        id: ids,
      },
    });
  },

  async getAllNeeds() {
    return Need.findAll();
  },
};
