const schema = `
  extend type Mutation {
    createOrganization(request: CreateOrganizationRequest!): Organization
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

  input CreateOrganizationRequest {
    authorId: ID!
    organization: OrganizationInput!
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
    createdAt: String!
    updatedAt: String
  }
`;

export default schema;
