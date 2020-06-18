const Room = require("../../models/room");
const User = require("../../models/user");

const room = async roomIDs => {
  try {
    const rooms = await Room.find({ _id: { $in: roomIDs } });
    return rooms.map(room => {
      return { ...room._doc, creator: user.bind(this, room.creator) };
    });
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      createdRoom: room.bind(this, user._doc.createdRoom)
    };
  } catch (err) {
    throw err;
  }
};

exports.user = user;
exports.room = room;
