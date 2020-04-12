import helmet from "helmet";
import bodyParser from "body-parser";
import express from "express";
import { ApolloServer } from "apollo-server-express";

import HelloResolver from "./graphql/resolvers/hello";
import HelloSchema from "./graphql/schemas/hello";
import routes from "./routes";

// Server definition
const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'"],
    scriptSrc: ["'self'"],
    childSrc: ["'none'"],
    objectSrc: ["'none'"],
  },
}));
app.use(helmet.noCache());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Graphql
const server = new ApolloServer({
  typeDefs: [HelloSchema],
  resolvers: [HelloResolver],
});
server.applyMiddleware({ app });

// Authentication routes
routes(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
