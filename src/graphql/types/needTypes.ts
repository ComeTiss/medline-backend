import { QueryOptions } from "./queryTypes";

export type NeedInput = {
    id: number;
    authorId: number;
    itemName: string;
    specifications: string;
    budget: number;
    limitDate: string;
    createdAt: string;
    updatedAt: string;
};

export type NeedQueryOptions = {
    options?: QueryOptions;
    filters?: {
        authorId?: number;
    };
};
