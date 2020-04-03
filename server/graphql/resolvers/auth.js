const bcrypt = require("bcryptjs");

const User = require("../../models/user");
const { room } = require("./merge");

module.exports = {
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
