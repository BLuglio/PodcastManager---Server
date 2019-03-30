const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar JSON
  type Rss {
      data: JSON
  }
  type Query {
      rss(url: String!): Rss
  }  
`;

module.exports = typeDefs;