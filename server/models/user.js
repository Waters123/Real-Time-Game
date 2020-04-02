const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdRoom: [
    {
      type: Schema.Types.ObjectId,
      ref: "RoomEvent"
    }
  ]
});

module.exports = mongoose.model("user", userSchema);
