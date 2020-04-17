import { ApolloServer } from "apollo-server-express";
import LeadResolvers from "./resolvers/LeadResolvers";
import NeedResolvers from "./resolvers/NeedResolvers";
import UserResolvers from "./resolvers/UserResolvers";
import LeadSchema from "./schemas/LeadSchema";
import NeedSchema from "./schemas/NeedSchema";
import QuerySchema from "./schemas/QuerySchema";
import UserSchema from "./schemas/UserSchema";

const server = new ApolloServer({
  typeDefs: [QuerySchema, LeadSchema, NeedSchema, UserSchema],
  resolvers: [LeadResolvers, NeedResolvers, UserResolvers],
  playground: {
    settings: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      "schema.polling.enable": false,
      "request.credentials": "include",
    },
  },
});

export default server;
