import mongoose, {Schema} from "mongoose";

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
  actors: [{type:Schema.type.ObjectId, ref: 'Actor'}],
  Genres: [{type:Schema.type.ObjectId, ref: 'Genre'}],
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
  isNew: {
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
  __v: {
    type: Number,
    required: false
  },
  dateUpdated: {
    type: Date,
    required: false
  },
  dateCreate: {
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
    type: Schema.type.ObjectId, 
    ref: 'Media'
  }
});

export default mongoose.model('Movie', MovieSchema);
