const bodyParser = require('body-parser');
const { makeExecutableSchema } = require('graphql-tools');
const fetch = require('node-fetch');

const { getAnsatte, addAnsatt, getLønn, spark } = require('./ansatteDao');

const typeDefs = `
  type Lonn {
    id: String!
    arlig: Int!,
    bonus: Int!,
  }

  type Vaer {
    type: String!
    temperatur: String!
  }

  type Ansatt { 
    id: String!
    navn: String,
    sparken: Boolean,
    lonn: Lonn!
    vaer: Vaer
  }

  type Query { 
    ansatte: [Ansatt]!
    ansatt(navn: String!): Ansatt
    ansattEtterId(id: Int!): Ansatt @deprecated(reason: "Ikke bruk a pls, fjerner den om et par måneder.")
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
    ansattEtterId: (_, { id }) => getAnsatte()[id],
  },
  Ansatt: {
    lonn: ansatt => {
      return getLønn(ansatt);
    },
    vaer: async ansatt => {
      const response = await fetch(
        'https://api.openweathermap.org/data/2.5/weather?lat=59.91&lon=10.75&units=metric&APPID=50d53b57e7a780f412bce602d169faaf',
      ).then(res => res.json());

      if (response.status > 300) {
        return { type: 'No weather-data found, API key probably broken.' };
      } else {
        return { type: response.weather[0].description, temperatur: response.main.temp };
      }
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
