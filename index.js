import express from "express";
import mongoose, {Schema} from "mongoose";
import graphlHTTP from "express-graphql";
import schema from "./schema";
import {MovieList, Actors} from './controllers/MoviesController'
import bodyParser from "body-parser"


const app = express();
const PORT = 8080;



mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/gql_db");

Schema.Types.ObjectId.prototype.valueOf = function () {
  return this.toJSON();
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

console.log(Actors);
app.get('/api/movies', MovieList)

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
