const bcrypt = require("bcryptjs");

const Event = require("../../models/event");
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

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        return { ...event._doc };
      });
    } catch (err) {
      throw err;
    }
  },

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

  userEvents: async () => {
    try {
      const user = await User.find();
      return user.map(results => {
        return {
          ...results._doc,
          createdRoom: room.bind(this, results._doc.createdRoom)
        };
      });
    } catch (err) {
      throw err;
    }
  },

  createEvent: args => {
    const event = new Event({
      name: args.eventInput.name,
      img: args.eventInput.img
    });

    return event
      .save()
      .then(result => {
        console.log(result);
        return { ...result._doc };
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
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
  },

  createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });

      if (existingUser) {
        throw new Error("this user already exists");
      }

      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword
      });
      await user.save();

      return {
        ...user._doc,
        password: null
      };
    } catch (err) {
      throw err;
    }
  }
};
