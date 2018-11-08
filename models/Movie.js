import mongoose from "mongoose";
const Schema = mongoose.Schema;

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
    required: true
  },
  coverImage: {
    type: String,
    required: true
  },
  fullImage: {
    type: String,
    required: true
  },
  actors: [{type:Schema.Types.ObjectId, ref: 'Actor'}],
  Genres: [{type:Schema.Types.ObjectId, ref: '_Genre'}],
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
  _isNew: {
    type: String,
    required: false,
    default: false
  },
  released:{
    type: Date,
    requried: true
  },
  rated: {
    type: Number,
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
    type: Schema.Types.ObjectId, 
    ref: 'MediaContent'
  }
});

export default mongoose.model('Movie', MovieSchema);
