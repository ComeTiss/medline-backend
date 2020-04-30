const schema = `
  extend type Mutation {
    updateUser(request: UserInput!): User
  }

  extend type Query {
    getUsersWithOptions(request: GetUsersRequest): GetUsersResponse
  }

  input GetUsersRequest {
    options: QueryOptions
    filters: UserFilters
  }

  type GetUsersResponse {
    users: [User]
  }

  input UserFilters {
    userId: ID!
  }

  input UserInput {
    firstName: String
    lastName: String
    email: String
    civility: String
    functionTitle: String
    displayEmail: String
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    displayEmail: String
    civility: String!
    verifiedAt: String
    functionTitle: String!
    organizationId: ID!
    organization: Organization
    contacts: Contacts
    isAdmin: Boolean!
    createdAt: String!
    updatedAt: String
    deletedAt: String
  }
`;

export default schema;
