import express from "express";
import mongoose from "mongoose";
import graphlHTTP from "express-graphql";
import schema from "./schema";

const app = express();
const PORT = 8080;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/gql_db");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/api", (req, res) => {
  res.json({
    msg: "Welc0me to GraphQL"
  });
});

app.use(
  "/graphql",
  graphlHTTP({
    schema: schema,
    graphiql: true
  })
);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
