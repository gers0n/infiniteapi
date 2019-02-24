
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
        connectionString: process.env.mongoConnectionString || "",
        DBName: "gql_db"
    };
    break;
  case "dev":
  default:
    config.mongo = {
      DBName: "gql_db",
      connectionString: "mongodb://localhost"
  };
    break;
  }

module.exports = config;
