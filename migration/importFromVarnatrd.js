const fetch = require("node-fetch");
// const axios = require("axios");
const MovieModel = require("../models/Movie");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/gql_db");

const endpoints = {
  movies: `http://varnatrd.tech/api/movies`,
  series: `http://varnatrd.tech/api/series`
};

// models
const Schema = mongoose.Schema;

Schema.Types.ObjectId.prototype.valueOf = function() {
  return this.toJSON();
};

// End models

let Data = {
  Movies: [],
  Series: []
};

let MovieIdList = [];
let fullMoviesInfo = [];

const getMovies = callback => {
  fetch(endpoints.movies)
    .then(res => res.json())
    .then(json => {
      Data.Movies = json;
      callback();
    })
    .catch(err => console.log("err", err));
};

const creationOptions = {
  SINGLE: "single",
  MULTIPLE: "multiple"
};

const createOneOrMany = (data, callback) => {
  console.log("trying to create", data.length);
  MovieModel.insertMany(
    data.map(mapMovieJsonToMovieModel),
    { ordered: false },
    callback
  );
};

const setMoviesIdList = callback => {
  Data.Movies.forEach(movie =>
    MovieIdList.indexOf(movie._id) < 0 ? MovieIdList.push(movie._id) : null
  );
  console.log("Getting all the data...", MovieIdList.length);
  callback();
};

const setFullData = cb => {
  console.log("Getting all docs with missing content");
  MovieModel.find({ mediaContent: "" }, { _id: 1 }, (err, res) => {
    if (err !== null) return;
    var timeoutTimer = 250;

    res.map(v => v._id).forEach(id => {
      timeoutTimer += 10;

      setTimeout(() => {
        console.log("fetching for ", id);
        fetch(`${endpoints.movies}/${id}`)
          .then(res => res.json())
          .catch(err => {
            var index = fullMoviesInfo.indexOf(id);
            fullMoviesInfo.splice(index, 1);
            console.log("could not get the docs with id ", id);
            return;
          })
          .then(data => {
            if (data !== null && data !== undefined) {
              fullMoviesInfo.push(data);
              let lastValue = res[res.length - 1];
              if (fullMoviesInfo.length%10 === 0 || (lastValue._id && lastValue._id.toString() === data._id.toString())) {
                console.log(`importing ${fullMoviesInfo.length}`);
                
                cb(fullMoviesInfo, () => {});
                fullMoviesInfo = [];
              }
            }
          })
          .catch(err => {
            fullMoviesInfo.splice(index, 1);
            console.log("err", err);
          });
      }, timeoutTimer); /* end setTimeout */
    }); /* forEach Ends */
  }); /* Collection.find ends */
};

const mapMovieJsonToMovieModel = movie => {
  return {
    _id: new mongoose.Types.ObjectId(movie._id),
    title: movie.title,
    year: movie.year,
    released: movie.released,
    runtime: movie.runtime,
    rated: movie.rated,
    rating: movie.rating,
    synopsis: movie.synopsis,
    imdbId: movie.imdbId,
    covertImage: movie.covertImage,
    fullImage: movie.fullImage,
    trailer: movie.trailer,
    actors: movie.actors,
    dateUpdated: movie.dateUpdate || new Date(),
    userCreated: movie.userCreate,
    userUpdated: movie.userUpdate,
    synopsisEng: movie.synopsisEng,
    categories: movie.categories,
    onlyEnglish: movie.onlyEnglish,
    monoAudio: movie.monoAudio,
    audioSpa: movie.audioSpa,
    audioEng: movie.audioEng,
    status: movie.status,
    mediaContent: movie.content ? movie.content[0].link || "" : "",
    dateCreated: movie.dateCreated || new Date(),
    mailOrigin: movie.mailOrigin,
    view: movie.view,
    hasOscar: movie.hasOscar,
    isPremiere: movie.isPremiere,
    genres: movie.genres || [],
    position: movie.position
  };
};

const SaveMovies = (docs, cb) => {
  // MovieModel.insertMany(fullMoviesInfo,{upsert: true}, (err, res)=>{console.log(err, res); if(cb) cb()});
  docs.forEach(m => {
    // Model.update({_id: id}, obj, {upsert: true, setDefaultsOnInsert: true}, cb);

    MovieModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(m._id) },
      mapMovieJsonToMovieModel(m),
      {upsert: true, setDefaultsOnInsert: true},
      ()=> {
        console.log(" == Doc updated ", m._id);
      });
    });
};

const MigrateMovies = () => {
  // getMovies(() => {
  //   console.log("list of movies loaded", Data.Movies.length);
  //   setMoviesIdList(() => {
  //     setFullData(SaveMovies);
  //   });
  //   console.log("Id list ready");
  // });
};

export default MigrateMovies;
