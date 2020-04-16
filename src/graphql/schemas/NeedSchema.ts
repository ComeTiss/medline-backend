const schema = `
  type Mutation {
    mutateNeed(request: MutateNeedRequest!): Need
    deleteNeeds(request: DeleteNeedsRequest!): DeleteNeedsResponse!
  }

  type Query {
    getAllNeeds(request: GetAllNeedsRequest): [Need]
  }

  input NeedFilters {
    authorId: String
  }

  input GetAllNeedsRequest {
    options: QueryOptions
    filters: NeedFilters
  }

  input DeleteNeedsRequest {
    ids: [ID]!
  }
  input MutateNeedRequest {
    id: ID
    authorId: ID!
    itemName: String!
    specifications: String
    quantity: String!
    budget: String!
    expireAt: String!
  }

  type DeleteNeedResponse {
    success: Boolean
  }

  type Need {
    id: ID!
    authorId: ID!
    itemName: String!
    specifications: String
    quantity: String!
    budget: String!
    expireAt: String!
    createdAt: String!
    updatedAt: String
  }
`;

export default schema;
