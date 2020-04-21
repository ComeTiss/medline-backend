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
    country: String
    city: String
    functionTitle: String
    contactID: String
    contactType: String
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    verifiedAt: String
    country: String!
    city: String!
    functionTitle: String!
    organization: Organization
    contactID: String
    contactType: String
    isAdmin: Boolean!
    createdAt: String!
    updatedAt: String
    deletedAt: String
  }
`;

export default schema;
