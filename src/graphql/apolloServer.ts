import { ApolloServer } from "apollo-server-express";
import LeadResolvers from "./resolvers/LeadResolvers";
import NeedResolvers from "./resolvers/NeedResolvers";
import UserResolvers from "./resolvers/UserResolvers";
import ContactResolvers from "./resolvers/ContactResolvers";
import OrganizationResolvers from "./resolvers/OrganizationResolvers";
import LeadSchema from "./schemas/LeadSchema";
import NeedSchema from "./schemas/NeedSchema";
import QuerySchema from "./schemas/QuerySchema";
import UserSchema from "./schemas/UserSchema";
import ContactSchema from "./schemas/ContactSchema";
import OrganizationSchema from "./schemas/OrganizationSchema";

const server = new ApolloServer({
  typeDefs: [QuerySchema, LeadSchema, NeedSchema, UserSchema, OrganizationSchema, ContactSchema],
  resolvers: [LeadResolvers, NeedResolvers, UserResolvers, OrganizationResolvers, ContactResolvers],
  playground: {
    settings: {
      // @ts-ignore
      "schema.polling.enable": false,
      "request.credentials": "include",
    },
  },
  // @ts-ignore
  context: ({ req }) => req?.user,
});

export default server;
