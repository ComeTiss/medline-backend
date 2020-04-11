'use strict';

const resolvers = {
  Query: {
    hello: () => {
      return "Hello world!!!"; 
    }
  }
};


module.exports = resolvers;