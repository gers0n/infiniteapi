import mongoose from "mongoose";
const Schema = mongoose.Schema;

Schema.Types.ObjectId.prototype.valueOf = function() {
  return this.toJSON();
};

export const MovieSchema = new Schema({
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
    required: false
  },
  synopsis: {
    type: String,
    required: false,
    index: true
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
  actors: [
    {
      type: String
    }
  ],
  // actors: [{type:Schema.Types.ObjectId, ref: 'Actor'}],
  genres: [
    {
      type: String
    }
  ],
  categories: [
    {
      type: String
    }
  ],
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
    required: false,
    index: true
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
  }
  // mediaContent: {type: Schema.Types.ObjectId, ref: "Media"}
});

export const MovieModel = mongoose.model("Movie", MovieSchema);
export default MovieModel;