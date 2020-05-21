
export type QueryOptions = {
  page: number;
  limit: number;
};

export type LeadQueryOptions = {
  options?: QueryOptions;
  filters?: {
      id?: number;
      authorId?: number;
  };
};
