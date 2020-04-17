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
    id: ID!
    firstName: String
    lastName: String
    email: String
    country: String
    city: String
    functionTitle: String
    company: String
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
    company: String!
    contactID: String
    contactType: String
    createdAt: String!
    updatedAt: String
  }
`;

export default schema;
