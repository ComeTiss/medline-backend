const schema = `
  extend type Mutation {
    mutateNeed(request: NeedInput!): Need
    deleteNeedsByIds(request: [ID]!): DeleteNeedResponse!
  }

  extend type Query {
    getAllNeeds(request: NeedQueryOptions): [Need]
  }

  input NeedFilters {
    authorId: String
  }

  input NeedQueryOptions {
    options: QueryOptions
    filters: NeedFilters
  }

  input NeedInput {
    id: ID
    authorId: ID
    itemName: String
    specifications: String
    quantity: String!
    budget: String!
    expirationDate: String
  }

  type DeleteNeedResponse {
    success: Boolean
  }

  type Need {
    id: ID!
    authorId: ID
    itemName: String!
    specifications: String
    quantity: String!
    budget: String!
    expirationDate: String!
    createdAt: String!
    updatedAt: String
  }
`;

export default schema;
