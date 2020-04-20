const schema = `
  type Mutation {
    mutateLead(request: MutateLeadRequest!): Lead
    deleteLeadsByIds(request: DeleteLeadsByIdsRequest!): [Lead]
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
    itemName: String!
    specifications: String
    quantity: String!
    cost: String!
    availableAt: String!
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
    deletedAt: String
  }
`;

export default schema;
