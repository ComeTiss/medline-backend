import Need from "../db/models/Need";
import { NeedInput, NeedQueryOptions } from "../graphql/types/needTypes";
import QueryUtils from "../utils/queryUtils";

const MIN_URGENCY_LEVEL = 1;
const MAX_URGENCY_LEVEL = 5;

export default {
  async create(need: NeedInput, authorId: number) {
    if (need?.urgencyLevel > MAX_URGENCY_LEVEL
      || need?.urgencyLevel < MIN_URGENCY_LEVEL) {
      throw new Error(`Urgency level must be between \
        ${MIN_URGENCY_LEVEL} to \
        ${MAX_URGENCY_LEVEL}`);
    }
    if (authorId == null) {
      throw new Error("Creation failed: missing 'authorId'");
    }
    return Need.create(need);
  },

  async update(need: NeedInput, authorId: number) {
    if (!need?.id || authorId == null) {
      return null;
    }
    const updatedRows = await Need.update(need, {
      where: { id: need.id, authorId },
    });
    if (updatedRows[0] === 0) {
      throw new Error("Update failed: invalid 'id' or 'authorId' ");
    }
    return Need.findByPk(need.id);
  },

  async deleteByIds(ids: Array<number>, authorId: number): Promise<Array<Need>> {
    if (ids == null || ids.length === 0 || authorId == null) {
      throw new Error("Invalid request content");
    }
    const values = { deletedAt: Date.now() };
    const where = { authorId, id: ids };
    const updatedRows = await Need.update(values, { where });
    if (updatedRows[0] === 0) {
      throw new Error("Delete failed: invalid 'ids' or 'authorId' ");
    }
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
