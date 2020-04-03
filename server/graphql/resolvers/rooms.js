const Room = require("../../models/room");
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

  createRoom: async args => {
    const event = new Room({
      roomName: args.roomInput.roomName,
      roomId: args.roomInput.roomId,
      creator: "5e8608ebba80fc2cdcabc8f3"
    });
    let createdRoom;
    try {
      const result = await event.save();

      createdRoom = {
        ...result._doc,
        creator: user.bind(this, result._doc.creator)
      };
      const existingUser = await User.findById("5e8608ebba80fc2cdcabc8f3");

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
