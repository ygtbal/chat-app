import mongoose, {Schema} from 'mongoose';

const schema = mongoose.Schema({
  name: String,
  room: String,
  isRemoved: Boolean,
  socketId: String
});

module.exports = mongoose.model("users", schema);