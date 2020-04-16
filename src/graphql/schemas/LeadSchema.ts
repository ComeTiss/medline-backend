const schema = `
  type Mutation {
    mutateLead(request: MutateLeadRequest!): Lead
    deleteLeads(request: DeleteLeadsRequest!): DeleteLeadsResponse!
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

  input DeleteLeadsRequest {
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

  type DeleteLeadResponse {
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
