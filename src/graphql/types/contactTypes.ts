import { QueryOptions } from "./queryTypes";

export type ContactQueryOptions = {
  options: QueryOptions;
  filters: {
    contactId: number;
  };
}

export type ContactInput = {
  id: number;
  userId: string;
  type: string;
  value: string;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
