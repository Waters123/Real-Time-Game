const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
      const existingEmail = await User.findOne({ email: args.userInput.email });
      const existingName = await User.findOne({ name: args.userInput.name });

      if (existingEmail || existingName) {
        throw new Error("this user already exists");
      }

      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        name: args.userInput.name,
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
  },

  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Something is incorrect");
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("Something is incorrect");
    }
    const token = jwt.sign(
      { userID: user.id, email: user.email },
      "secretkey",
      {
        expiresIn: "2h"
      }
    );

    return { userID: user.id, token: token, tokenExpiration: 2 };
  }
};
