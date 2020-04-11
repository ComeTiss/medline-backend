'use strict';

const helmet = require('helmet');
var bodyParser = require('body-parser');
var express = require("express");
const { ApolloServer } = require('apollo-server-express');

const HelloResolver = require("./graphql/resolvers/hello");
const HelloSchema = require("./graphql/schemas/hello");

// Server definition
var app = express();
const PORT = 4000;

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'"],
    scriptSrc: ["'self'"],
    childSrc: ["'none'"],
    objectSrc: ["'none'"],
  }
}));
app.use(helmet.noCache());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

require("./routes")(app);

// Graphql 
const server = new ApolloServer({ 
  typeDefs: [ HelloSchema ],
  resolvers: [ HelloResolver ] 
});
server.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
