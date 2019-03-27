import mongoose, {Schema, mongo} from "mongoose";

Schema.Types.ObjectId.prototype.valueOf = function() {
  return this.toJSON();
};

const GenreSchema = new Schema({
  name: {type:String, required:true}
});

export default mongoose.model('Genres', GenreSchema);