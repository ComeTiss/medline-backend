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

export enum ContactType {
  PHONE_NUMBER = "PHONE_NUMBER",
  WHATSAPP = "WHATSAPP",
  WECHAT = "WECHAT",
  SKYPE = "SKYPE"
}
