const schema = `
  extend type Mutation {
    createOrganization(request: OrganizationInput!): Organization
  }

  extend type Query {
    getOrganizationsWithOptions(request: GetOrganizationsRequest): [Organization]
  }

  input GetOrganizationsRequest {
    options: QueryOptions
    filters: OrganizationFilters
  }

  input OrganizationFilters {
    organizationId: ID!
  }

  input OrganizationInput {
    name: String!
    address: String!
    country: String!
    city: String!
    activity: String!
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
