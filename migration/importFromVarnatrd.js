const fetch = require("node-fetch");
const axios = require("axios");
// const MovieModel = require("../models/Movie");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/gql_db");

const endpoints = {
  movies: `http://varnatrd.tech/api/movies`,
  series: `http://varnatrd.tech/api/series`
};


// models

// const mongoose = require("mongoose");
const Schema = mongoose.Schema;

Schema.Types.ObjectId.prototype.valueOf = function() {
  return this.toJSON();
};

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: false
  },
  synopsis: {
    type: String,
    required: false
  },
  synopsisEng: {
    type: String,
    required: false
  },
  covertImage: {
    type: String,
    required: true
  },
  fullImage: {
    type: String,
    required: true
  },
  actors: [{
    type: String
  }],
  // actors: [{type:Schema.Types.ObjectId, ref: 'Actor'}],
  genres: [{
    type: String
  }],
  categories: [{
    type: String
  }],
  // genres: [{type:Schema.Types.ObjectId, ref: 'Genre'}],
  hasOscar: {
    type: String,
    required: false,
    default: false
  },
  isPremiere: {
    type: String,
    required: false,
    default: false
  },
  released: {
    type: Date,
    requried: true
  },
  rated: {
    type: String,
    required: false,
    defualt: false
  },
  imdbId: {
    type: String,
    required: false
  },
  trailer: {
    type: String,
    required: false
  },
  dateUpdated: {
    type: Date,
    required: false
  },
  dateCreated: {
    type: Date,
    required: false
  },
  view: {
    type: Number,
    required: false
  },
  position: {
    type: Number,
    required: false
  },
  mailOrigin: {
    type: String,
    required: false
  },
  mediaContent: {
    type: String,
    required: false
  },
  // mediaContent: {type: Schema.Types.ObjectId, ref: "Media"}
});

const MovieModel = mongoose.model("Movie", MovieSchema);

// End models

let Data = {
  Movies: [],
  Series: []
};

let MovieIdList = [];
let fullMoviesInfo = [];

const getMovies = cb => {
  fetch(endpoints.movies)
    .then(res => res.json())
    .then(json => {
      Data.Movies = json;
      cb();
    })
    .catch(err => console.log("err", err));
};
const setMoviesIdList = () => {
  Data.Movies.forEach(movie =>
  // let movie = Data.Movies[0];
    MovieIdList.indexOf(movie._id) < 0 ? MovieIdList.push(movie._id) : null
  );
};

const setFullData = (cb) => {
  MovieIdList.forEach(id => {
  // let id = MovieIdList[0];
  fetch(`${endpoints.movies}/${id}`)
    .then(res => res.json())
    .catch(err => {
      console.log("could not get ", id);
    })
    .then(text => {
      // let json = JSON.parse(text);
      let json = text;
      if (json !== null && json !== undefined) {
        // fullMoviesInfo.push(json);
        MovieModel.create(mapMovieJsonToMovieModel(json));
      }
      
      // if (MovieIdList[MovieIdList.length - 1] === json._id) {
      //   console.log("finished");
      //   console.log("importing..")
      //   cb();
      // }
    })
    .catch(err => {
      console.log("err", err);
    });
  })
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
    dateUpdated: movie.dateUpdate,
    userCreated: movie.userCreate,
    userUpdated: movie.userUpdate,
    synopsisEng: movie.synopsisEng,
    categories: movie.categories,
    onlyEnglish: movie.onlyEnglish,
    monoAudio: movie.monoAudio,
    audioSpa: movie.audioSpa,
    audioEng: movie.audioEng,
    status: movie.status,
    mediaContent: movie.content[0].link || "",
    dateCreated: movie.dateCreated,
    mailOrigin: movie.mailOrigin,
    view: movie.view,
    hasOscar: movie.hasOscar,
    isPremiere: movie.isPremiere,
    genres: movie.genres || [],
    position: movie.position
  };
};
const SaveMovies = () => {
  fullMoviesInfo.forEach(m => {
    // Model.update({_id: id}, obj, {upsert: true, setDefaultsOnInsert: true}, cb);
    MovieModel.create(mapMovieJsonToMovieModel(m));
  });
};

const MigrateMovies = () => {
  // console.dir( MovieModel.create);
  getMovies(() => {
    console.log("list of movies loaded", Data.Movies.length);
    setMoviesIdList();
    console.log("Id list ready");
    console.log("Getting all the data...",MovieIdList.length);
    setFullData(SaveMovies);
    
  });
};

export default MigrateMovies;
