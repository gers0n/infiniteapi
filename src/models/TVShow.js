import mongoose from "mongoose";
import {MediaSchema} from "./Media";

const Schema = mongoose.Schema;

Schema.Types.ObjectId.prototype.valueOf = function() {
  return this.toJSON();
};

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
  released: {
    type: String,
    required: false,
    index: true
  },
  rating: {
    type: Number,
    required: false
  },
  runtime: {
    type: String,
    required: false
  },
  rated: {
    type: String,
    required: false
  },
  synopsis: {
    type: String,
    required: false,
    index: true
  },
  imdbId: {
    type: String,
    required: false
  },
  synopsisEng: {
    type: String,
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
  actors: [{ type: String, required: false, index: true }],
  dateUpdated: {
    type: String,
    required: false
  },
  userCreate: {
    type: String,
    required: false
  },
  userUpdate: {
    type: String,
    required: false
  },
  categories: [{ type: String, required: false }],
  onlyEnglish: {
    type: Boolean,
    required: false
  },
  monoAudio: {
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
  status: {
    type: Boolean,
    required: false
  },
  content: [MediaSchema],
  dateCreate: {
    type: String,
    required: false
  },
  mailOrigin: {
    type: String,
    required: false
  },
  view: { type: Number },
  hasOscar: { 
    type: Boolean,
    required: false
   },
  isPremiere: { 
    type: Boolean,
    required: false
   },
  genres: [{ type: String, required: false }],
  position: { type: Number }
});

export const MovieModel = mongoose.model("TVShow", TVShowSchema);
export default MovieModel;
