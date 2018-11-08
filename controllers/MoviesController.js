import MovieModel from "../models/Movie";
import ActorModel from "../models/Actor";

export const MovieList = (req, res) => {
  MovieModel.find({}, (err, docs) => res.json({ error: err, data: docs }));
};

export const Actors = (req, res) => {
  ActorModel.find({}, (err, docs) => res.json({ error: err, data: {
    ...docs
  } }));
};
