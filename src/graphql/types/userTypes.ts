import { QueryOptions } from "./queryTypes";

export type SignUpData = {
  email: string;
  password: string;
  civility: string;
  firstName: string;
  lastName: string;
  organizationName: string;
  functionTitle: string;
  address: string;
  city: string;
  activity: string;
  country: string;
  displayEmail: string;
}

export enum Civility {
  MS = "Ms.",
  MR = "Mr.",
  DR = "Dr.",
}

export type UserInput = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    functionTitle: string;
    civility?: string;
    organizationId?: string;
    verifiedAt?: string;
    displayEmail?: string;
    whatsapp?: string;
    zoom?: string;
    phoneNumber?: string;
    wechat?: string;
    skype?: string;
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
