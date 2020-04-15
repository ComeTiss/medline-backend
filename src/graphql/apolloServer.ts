import { ApolloServer } from "apollo-server-express";
import LeadResolvers from "./resolvers/LeadResolvers";
import NeedResolvers from "./resolvers/NeedResolvers";
import LeadSchema from "./schemas/LeadSchema";
import NeedSchema from "./schemas/NeedSchema";
import QuerySchema from "./schemas/QuerySchema";

const server = new ApolloServer({
  typeDefs: [QuerySchema, LeadSchema, NeedSchema],
  resolvers: [LeadResolvers, NeedResolvers],
});

export default server;
