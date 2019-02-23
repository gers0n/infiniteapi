import mongoose, {Schema, mongo} from 'mongoose'

const MediaSchema = new Schema({
  link: {
    type: String,
    required: false
  },
  quality: {
    type: String,
    required: false
  },
  status:{
    type: Boolean,
    required: false,
    default: false
  },
  subtitleEng: {
    type: Boolean,
    required: false,
    default: false
  },
  subtitleSpa: {
    type: Boolean,
    required: false,
    default: false
  },
  audioEng: {
    type: Boolean,
    required: false,
    default: false
  },
  audioSpa: {
    type: Boolean,
    required: false,
    default: false
  }
});

export default mongoose.model('MediaContent', MediaSchema);