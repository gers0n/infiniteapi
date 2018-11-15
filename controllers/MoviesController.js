import MovieModel from "../models/Movie";

export const MovieList = (req, res) => {
  MovieModel.find({}, (err, docs) => res.json({ error: err, data: docs }));
};


