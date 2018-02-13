const bodyParser = require('body-parser');
const { makeExecutableSchema } = require('graphql-tools');

const { getAnsatte, addAnsatt, getLønn, spark } = require('./ansatteDao');

const typeDefs = `
  type Lonn {
    id: String!
    arlig: Int!,
    bonus: Int!,
  }

  type Ansatt { 
    id: String!
    navn: String,
    sparken: Boolean,
    lonn: Lonn!
  }

  type Query { 
    ansatte: [Ansatt]!
    ansatt(navn: String!): Ansatt
  }

  type Mutation {
    nyAnsatt(navn: String!): Ansatt!
    spark(navn: String): Ansatt!
  }
`;

// The resolvers
const resolvers = {
  Query: {
    ansatte: () => getAnsatte(),
    ansatt: (_, { navn }) => {
      const filtrert = getAnsatte().filter(ansatt => ansatt.navn === navn);

      return filtrert.length ? filtrert[0] : null;
    },
  },
  Ansatt: {
    lonn: ansatt => {
      return getLønn(ansatt);
    },
  },
  Mutation: {
    nyAnsatt: (_, { navn }) => {
      return addAnsatt(navn);
    },
    spark: (_, { navn }) => {
      return spark(navn);
    },
  },
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
