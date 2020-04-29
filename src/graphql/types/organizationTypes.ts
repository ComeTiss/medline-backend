import { QueryOptions } from "./queryTypes";

export type OrganizationQueryOptions = {
  options: QueryOptions;
  filters: {
    organizationId: number;
  };
}

export type OrganizationInput = {
  name: string;
  address: string;
  city: string;
  country: string;
  activity: string;
}
