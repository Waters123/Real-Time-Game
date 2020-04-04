const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  roomName: {
    type: String,
    required: true
  },

  creator: {
    type: Schema.Types.ObjectId,
    ref: "user"
  }
});

module.exports = mongoose.model("RoomEvent", roomSchema);
