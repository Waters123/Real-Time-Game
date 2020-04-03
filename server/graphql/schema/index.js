const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Event {
    _id: ID!
    name:String!
    img:String!
}

type RoomEvent{
  _id: ID!
  roomName:String
  roomId:String
  creator:UserEvent!
}

type UserEvent {
  _id:ID!,
  email:String!
  password:String
  createdRoom:[RoomEvent!]
}

input UserInput{
  email:String!
  password:String!
}  

input EventInput {
  name:String!
  img:String!
} 

input RoomInput{
  roomName:String
  roomId:String
}

 type RootQuery{
      events:[Event!]!
      roomEvents:[RoomEvent!]!
      userEvents:[UserEvent!]!
 }

 type RootMutation{
      createEvent( eventInput:EventInput ):Event
      createRoom( roomInput: RoomInput):RoomEvent
      createUser( userInput:UserInput ):UserEvent
 }
   schema {
       query:RootQuery
       mutation:RootMutation
   }
 `);
