const schema = `
  extend type Mutation {
    mutateNeed(request: NeedInput!): Need
    deleteNeedsByIds(request: [ID]!): DeleteNeedResponse!
  }

  extend type Query {
    getAllNeeds: [Need]
  }

  input NeedInput {
    id: ID
    authorId: ID
    itemName: String
    quantity: String!
    budget: String!
    limiteDate: String
  }

  type DeleteNeedResponse {
    success: Boolean
  }

  type Need {
    id: ID!
    authorId: ID
    itemName: String!
    quantity: String!
    budget: String!
    limiteDate: String!
    createdAt: String!
    updatedAt: String
  }
`;

export default schema;
