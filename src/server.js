var express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");

const graphQLschema = require("./graphql/schema");
const graphQLresolvers = require("./graphql/resolvers");

const schema = buildSchema(graphQLschema);
var app = express();

app.use("/graphql", graphqlHTTP({
  schema: schema,
  rootValue: graphQLresolvers
}));

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
