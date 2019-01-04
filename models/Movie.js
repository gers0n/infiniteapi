import mongoose from "mongoose";
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

export default mongoose.model("Movie", MovieSchema);
