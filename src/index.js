import mongoose from "mongoose";
import { GraphQLServer } from "graphql-yoga";
import {resolvers} from './resolvers';
import config from './config';

/* Connect Mongoose with MongoDb */
mongoose.Promise = global.Promise;
mongoose.connect(`${config.mongo.connectionString}/${config.mongo.DBName}`);

/* Statics */
const logger = res => {
  console.log("arguments", arguments);
  return res
};

/* Server Setup */
const server = new GraphQLServer({
  typeDefs: "./src/schemas.graphql",
  resolvers : resolvers,
  formatError: logger,
  formatResponse: logger,
});


/* Running the Server */
server.start(config.options, () => {
  console.log(
    `Server running at ${config.options.port}${config.options.endpoint}`
  );
});
