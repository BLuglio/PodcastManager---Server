const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar JSON
  type Episode {
    title: String,
    description: String,
    date: String
  }
  type Rss {
      id: String,
      url: String,
      podcastTitle: String,
      podcastDescription: String,
      imageUrl: String,
      episodes: [Episode]
  }
  type Query {
      rss(url: String!): Rss,
      multipleRss(urls: [String]!): [Rss]
  }  
`;

module.exports = typeDefs;