
const PORT = process.env.PORT || 8080;

let config = {
  mongo: {},
  options: {
    port: PORT,
    endpoint: '/api',
    // subscriptions: '/subscriptions',
    playground: '/playground',
  }
};

switch (process.env.NODE_ENV) {
  case "production":
    config.mongo = {
        connectionString: process.env.mongoConnectionString || ""
    };
    break;
  case "dev":
  default:
    config.mongo = {
      connectionString: "mongodb://localhost/gql_db"
  };
    break;
  }

export default config;
