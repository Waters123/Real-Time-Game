const Event = require("../../models/event");

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
  }
};
