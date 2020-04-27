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
}

// eslint-disable-next-line import/prefer-default-export

export enum ContactType {
  PHONE = "PHONE",
  WHATSAPP = "WHATSAPP",
  MESSENGER = "MESSENGER",
  WECHAT = "WECHAT",
  ZOOM = "ZOOM",
  SKYPE = "SKYPE"
}
