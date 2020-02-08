import mongoose from "mongoose";
import {MediaSchema} from "./Media";

const Schema = mongoose.Schema;

Schema.Types.ObjectId.prototype.valueOf = function() {
  return this.toJSON();
};

export const EpisodeSchema = new Schema({
  isPremiere: {
    type: Boolean,
    required: false
  },
  mailOrigin: {
    type: String,
    required: false,
    default: false
  },
  content: [MediaSchema],
  status: {
    type: Boolean,
    required: false
  },
  audioSpa: {
    type: Boolean,
    required: false
  },
  audioEng: {
    type: Boolean,
    required: false
  },
  view: {
    type: Number,
    required: false,
    index: true
  },
  monoAudio: {
    type: Boolean,
    required: false
  },
  onlyEnglish: {
    type: Boolean,
    required: false
  },
  dateUpdated: {
    type: String,
    required: false
  },
  userUpdate: {
    type: String,
    required: false
  },
  trailer: {
    type: String,
    required: false,
    default: false
  },
  fullImage: {
    type: String,
    required: false,
    default: false
  },
  season: {
    type: String,
    required: false,
    default: false
  },
  episode: {
    type: Number,
    required: false,
    default: false
  },
  covertImage: {
    type: String,
    required: false,
    default: false
  },
  rating: {
    type: Number,
    required: false,
    default: false
  },
  synopsis: {
    type: String,
    required: false,
    default: false
  },
  runtime: {
    type: String,
    required: false,
    default: false
  },
  released: {
    type: String,
    required: false,
    default: false
  },
  year: {
    type: Number,
    required: false,
    index: true
  },
  title: {
    type: String,
    required: true,
    default: false
  },
  imdbId: {
    type: String,
    required: false,
    default: false
  },
});


export const EpisodesOfEpisode = new Schema({
  episode: EpisodeSchema
});

  export const TVShowSchema = new Schema({
  title: {
    type: String,
    required: false,
    index: true
  },
  year: {
    type: Number,
    required: false,
    index: true
  },
  rating: {
    type: Number,
    required: false,
    index: true
  },
  covertImage: {
    type: String,
    required: false
  },
  fullImage: {
    type: String,
    required: false
  },
  trailer: {
    type: String,
    required: false
  },
  actors: [{
    type: String,
    required: false
  }],
  categories: [{
    type: String,
    required: false
  }],
  episodes: [EpisodesOfEpisode],
  dateCreate: {
    type: String,
    required: false
  },
  lastEpisodeDate: {
    type: String,
    required: false
  },
  subTitle: {
    type: String,
    required: false
  },
  genres: [{
    type: String,
    required: false
  }],
  isViewed: {
    type: String,
    required: false
  },
  isFavorite: {
    type: String,
    required: false
  },
  isRecent: {
    type: String,
    required: false
  },
  genres: [{ type: String, required: false }],
  position: { type: Number, required: false }
});

export const EpisodeModel = mongoose.model("Episode", EpisodeSchema);
export const EpisodesOfEpisodeModel = mongoose.model("EpisodesOfEpisode", EpisodesOfEpisode);
export const MovieModel = mongoose.model("TVShow", TVShowSchema);

export default MovieModel;
