import mongoose, {Schema, mongo} from "mongoose";

const GenreSchema = new Schema({
  title: {type:String, required:true}
});

export default mongoose.model('_Genre', GenreSchema);