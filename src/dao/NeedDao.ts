import Need from "../db/models/Need";
import { NeedInput, NeedQueryOptions } from "../graphql/types/needTypes";
import QueryUtils from "../utils/queryUtils";

const MIN_URGENCY_LEVEL = 1;
const MAX_URGENCY_LEVEL = 5;

export default {
  async create(need: NeedInput) {
    if (need?.urgencyLevel > MAX_URGENCY_LEVEL
      || need?.urgencyLevel < MIN_URGENCY_LEVEL) {
      throw new Error(`Urgency level must be between \
        ${MIN_URGENCY_LEVEL} to \
        ${MAX_URGENCY_LEVEL}`);
    }
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

  async deleteByIds(ids: Array<number>, authorId: number): Promise<Array<Need>> {
    if (ids == null || ids.length === 0 || authorId == null) {
      throw new Error("Invalid request content");
    }
    const values = { deletedAt: Date.now() };
    const where = { authorId, id: ids };
    await Need.update(values, { where });
    return Need.findAll({ where });
  },

  async getAllNeeds(request: NeedQueryOptions) {
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
    return Need.findAll(params);
  },
};
