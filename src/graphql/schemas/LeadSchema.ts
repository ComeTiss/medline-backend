const schema = `
  type Mutation {
    mutateLead(request: LeadInput!): Lead
    deleteLeadsByIds(request: [ID]!): DeleteLeadResponse!
  }

  type Query {
    getAllLeads(request: LeadQueryOptions): [Lead]
  }

  input LeadFilters {
    authorId: String
  }

  input LeadQueryOptions {
    options: QueryOptions
    filters: LeadFilters
  }

  input LeadInput {
    id: ID
    authorId: ID
    itemName: String
    specifications: String
    quantity: String!
    cost: String!
    availableAt: String
  }

  type DeleteLeadResponse {
    success: Boolean
  }

  type Lead {
    id: ID!
    authorId: ID
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
