const express = require("express");
const bodyParses = require("body-parser");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");

const PORT = process.env.PORT || 5000;

const app = express();

const events = [];

app.use(bodyParses.json());

app.use(
  "/graphql",

  graphqlHttp({
    schema: buildSchema(`
    type Event {
        _id: ID!
        name:String!
        img:String!
      
    }

    input EventInput {
        name:String!
        img:String!
        
    } 

     type RootQuery{
          events:[Event!]!

     }

     type RootMutation{
          createEvent( eventInput:EventInput ):Event
     }
       schema {
           query:RootQuery
           mutation:RootMutation
       }
     `),

    rootValue: {
      events: () => {
        return events;
      },
      createEvent: args => {
        const event = {
          _id: Math.random.toString(),
          name: args.eventInput.name,
          img: args.eventInput.img
        };
        console.log(args);
        events.push(event);
        return event;
      }
    },

    graphiql: true
  })
);

app.listen(PORT);
