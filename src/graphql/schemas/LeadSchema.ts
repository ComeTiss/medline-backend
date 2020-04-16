const schema = `
  type Mutation {
    mutateLead(request: MutateLeadRequest!): Lead
    deleteLeadsByIds(request: DeleteLeadsByIdsRequest!): DeleteLeadsByIdsResponse!
  }

  type Query {
    getAllLeads(request: GetAllLeadsRequest): [Lead]
  }

  input LeadFilters {
    authorId: String
  }

  input GetAllLeadsRequest {
    options: QueryOptions
    filters: LeadFilters
  }

  input DeleteLeadsByIdsRequest {
    ids: [ID]!
  }
  input MutateLeadRequest {
    id: ID
    authorId: ID!
    itemName: String!
    specifications: String
    quantity: String!
    cost: String!
    availableAt: String!
  }

  type DeleteLeadsByIdsResponse {
    success: Boolean
  }

  type Lead {
    id: ID!
    authorId: ID!
    itemName: String!
    specifications: String
    quantity: String!
    cost: String!
    availableAt: String!
    createdAt: String!
    updatedAt: String
  }
`;

export default schema;
