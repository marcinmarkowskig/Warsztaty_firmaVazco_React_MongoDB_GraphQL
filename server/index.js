const {ApolloServer, gql} = require('apollo-server');
const {MongoClient} = require('mongodb');

const typeDefs = gql`
  type Users {
    _id: ID
    name: String
    origin: String
    price: Float

    # _id: ID
    # username: String
    # avatar: String
    # birthdate: String
  }

  type Query {
    users(country:String): [Users!]!
  }
`;

const resolvers = {
  Query: {
    async users(parent, args, context, info) {
      // Tip 1: MongoDB connection.
      // let client;

      let client;
      const query = {};
      if (args.country) {
        query.origin = {$eq: args.country}
      }
      try {
        client = await MongoClient.connect('mongodb://workshop:workshop@ds227939.mlab.com:27939/workshop');
        const result = await client
          .db('workshop')
          .collection('products')
          // .db('workshop')
          // .collection('users')
          .find(query)
          .sort({origin:1})
          .toArray();

          return result;

      } finally {
        if (client) client.close();
      }

      // Tip 2: Delay the response a bit.
      // await new Promise(resolve => setTimeout(resolve, 1000));
      //mongodb://workshop:workshop@ds227939.mlab.com:27939/workshop
      // return [{
      //   answer: 'Hello there!',
      //   ok: true,
      //   time: 1337
      // }, {
      //   answer: 'Nope.',
      //   ok: false,
      //   time: 420
      // }, {
      //   answer: 'Input?',
      //   ok: args.input > 0,
      //   time: args.input
      // }];
    }
  }
};

const server = new ApolloServer({resolvers, typeDefs});

server.listen().then(({url}) => {
  console.log(`🚀  Server ready at ${url}`);
});
