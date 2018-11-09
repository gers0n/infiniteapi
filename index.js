import mongoose from "mongoose";
import { GraphQLServer } from "graphql-yoga";
import {resolvers} from './resolvers';

/* Connect Mongoose with MongoDb */
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/gql_db");

/* Statics */
const PORT = 8080;
const options = {
  port: PORT,
  endpoint: '/api',
  // subscriptions: '/subscriptions',
  playground: '/playground',
}

/* Server Setup */
const server = new GraphQLServer({
  typeDefs: "./schemas.graphql",
  resolvers : resolvers
});


/* Running the Server */
server.start(options, () => {
  console.log(
    `😄 Server running at http://localhost:${options.port}${options.endpoint}`
  );
});
