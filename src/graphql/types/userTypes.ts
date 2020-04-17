import { QueryOptions } from "./queryTypes";

// eslint-disable-next-line import/prefer-default-export
export const enum UserContactType {
  WHATSAPP = "WHATSAPP",
  WECHAT = "WECHAT",
  SKYPE = "SKYPE",
  MESSENGER = "MESSENGER",
  ZOOM = "ZOOM",
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
