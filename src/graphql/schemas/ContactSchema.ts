const schema = `
  extend type Mutation {
    mutateContact(request: MutateContactRequest!): Contact
    deleteContactsByIds(request: DeleteContactsByIdsRequest!): [Contact]
  }

  extend type Query {
    getContactsWithOptions(request: GetContactsRequest): GetContactsResponse
  }

  input GetContactsRequest {
    options: QueryOptions
    filters: ContactFilters
  }

  type GetContactsResponse {
    contacts: [Contact]
  }
  
  input DeleteContactsByIdsRequest {
    ids: [ID]!
  }

  input ContactFilters {
    contactId: ID!
  }

  input MutateContactRequest {
    id: String
    userId: String
    type: String
    value: String
    deletedAt: String
  }

  type Contact {
    id: String
    userId: String
    type: String
    value: String
    deletedAt: String
    createdAt: String
    updatedAt: String
  }
`;

export default schema;
