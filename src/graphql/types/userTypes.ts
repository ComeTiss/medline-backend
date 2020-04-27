import { QueryOptions } from "./queryTypes";

export type SignUpData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  organizationName: string;
  functionTitle: string;
  city: string;
  country: string;
}

export type UserInput = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    functionTitle: string;
    contactID?: string;
    contactType?: string;
    organizationId?: string;
    verifiedAt?: string;
}

export type UserQueryOptions = {
  options: QueryOptions;
  filters: {
    userId: number;
  };
}

export type UserFilters = {
  userId: number;
}
