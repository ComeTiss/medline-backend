const schema = `
  extend type Mutation {
    updateUser(request: UserInput!): User
  }

  extend type Query {
    getUsersWithOptions(request: GetUsersRequest): [User]
  }

  input GetUsersRequest {
    options: QueryOptions
    filters: UserFilters
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
    organizationId: ID
    contactID: String
    contactType: String
    isAdmin: Boolean!
    createdAt: String!
    updatedAt: String
    deletedAt: String
  }
`;

export default schema;
