import { QueryOptions } from "graphql/types/queryTypes";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;

export default {
  pagination(queryOptions: QueryOptions) {
    const page = queryOptions?.page || DEFAULT_PAGE;
    const limit = queryOptions?.limit || DEFAULT_LIMIT;
    const offset = (page - 1) * limit;
    return { offset, limit };
  },
};
