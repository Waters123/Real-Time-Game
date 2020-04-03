const bcrypt = require("bcryptjs");

const eventsResolver = require("./events");
const authResolver = require("./auth");
const roomsResolver = require("./rooms");

module.exports = {
  ...eventsResolver,
  ...authResolver,
  ...roomsResolver
};
