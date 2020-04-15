
export type QueryOptions = {
  page: number;
  limit: number;
};

export type LeadQueryOptions = {
  options?: QueryOptions;
  filters?: {
      authorId?: number;
  };
};
