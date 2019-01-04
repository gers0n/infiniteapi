import MovieModel from "../models/Movie";

export const MovieList = (req, res) => {
  fetch("http://varnatrd.tech/api/movies")
  .then(r => r.json())
  .then(data => res.json({data:data}));
  // MovieModel.find({}, (err, docs) => res.json({ error: err, data: docs }));
};


