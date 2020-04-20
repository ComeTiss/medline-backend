const schema = `
  extend type Mutation {
    mutateNeed(request: MutateNeedRequest!): Need
    deleteNeedsByIds(request: DeleteNeedsByIdsRequest!): [Need]
  }

  extend type Query {
    getAllNeeds(request: GetAllNeedsRequest): GetAllNeedsResponse
  }

  input NeedFilters {
    authorId: String
  }

  input GetAllNeedsRequest {
    options: QueryOptions
    filters: NeedFilters
  }

  type GetAllNeedsResponse {
    needs: [Need]
  }

  input DeleteNeedsByIdsRequest {
    ids: [ID]!
  }
  input MutateNeedRequest {
    id: ID
    itemName: String!
    specifications: String
    quantity: String!
    budget: String!
    expireAt: String!
    urgencyLevel: Int!
  }

  type Need {
    id: ID!
    authorId: ID!
    itemName: String!
    specifications: String
    quantity: String!
    budget: String!
    expireAt: String!
    urgencyLevel: Int!
    createdAt: String!
    updatedAt: String
    deletedAt: String
  }
`;

export default schema;
