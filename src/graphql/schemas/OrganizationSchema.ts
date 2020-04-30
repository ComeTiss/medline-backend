const schema = `
  extend type Query {
    getOrganizationsWithOptions(request: GetOrganizationsRequest): [Organization]
  }

  extend type Mutation {
    mutateOrganization(request: MutateOrganizationRequest!): Organization
  }

  input MutateOrganizationRequest {
    id: ID!
    name: String!
    address: String!
    country: String!
    city: String!
    activity: String!
  }

  input GetOrganizationsRequest {
    options: QueryOptions
    filters: OrganizationFilters
  }

  input OrganizationFilters {
    organizationId: ID!
  }

  type Organization {
    id: ID!
    name: String!
    address: String!
    country: String!
    city: String!
    activity: String!
    verifiedAt: String
    deletedAt: String
    createdAt: String!
    updatedAt: String
  }
`;

export default schema;
