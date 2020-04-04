const Room = require("../../models/room");
const User = require("../../models/user");
const { user } = require("./merge");

module.exports = {
  roomEvents: async () => {
    try {
      const rooms = await Room.find();
      return rooms.map(room => {
        return {
          ...room._doc,
          creator: user.bind(this, room._doc.creator)
        };
      });
    } catch (err) {
      throw err;
    }
  },

  createRoom: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("user is not authenticated");
    }
    const event = new Room({
      roomName: args.roomInput.roomName,
      creator: req.userID
    });
    let createdRoom;
    try {
      const result = await event.save();

      createdRoom = {
        ...result._doc,
        creator: user.bind(this, result._doc.creator)
      };
      const existingUser = await User.findById(req.userID);

      if (!existingUser) {
        throw new Error("user not found");
      }
      existingUser.createdRoom.push(event);
      await existingUser.save();

      return createdRoom;
    } catch (err) {
      throw err;
    }
  }
};
