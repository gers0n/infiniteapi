import express from "express";
import mongoose from "mongoose";
import graphlHTTP from "express-graphql";
import schema from "./schema";
import {MovieList, Actors} from './controllers/MoviesController'
import cors from 'cors';

const app = express();
const PORT = 8080;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/gql_db");

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(cors());

app.get("/api", (req, res) => {
  res.json({
    msg: "Welc0me to GraphQL"
  });
});

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
