import mongoose, {Schema, mongo} from "mongoose";

const ActorSchema = new Schema({
  title: {type:String, required:true}
});

export default mongoose.model('Actor', ActorSchema);