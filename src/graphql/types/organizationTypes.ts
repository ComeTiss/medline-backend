import { QueryOptions } from "./queryTypes";

export type OrganizationQueryOptions = {
  options: QueryOptions;
  filters: {
    organizationId: number;
  };
}
