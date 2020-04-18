const schema = `
  extend type Mutation {
    mutateNeed(request: MutateNeedRequest!): Need
    deleteNeedsByIds(request: DeleteNeedsByIdsRequest!): DeleteNeedsByIdsResponse!
  }

  extend type Query {
    getAllNeeds(request: GetAllNeedsRequest): [Need]
  }

  input NeedFilters {
    authorId: String
  }

  input GetAllNeedsRequest {
    options: QueryOptions
    filters: NeedFilters
  }

  input DeleteNeedsByIdsRequest {
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
    urgencyLevel: Int!
  }

  type DeleteNeedsByIdsResponse {
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
    urgencyLevel: Int!
    createdAt: String!
    updatedAt: String
  }
`;

export default schema;
