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
  creator:UserEvent!
}

type UserEvent {
  _id:ID!,
  name:String!
  email:String!
  password:String
  createdRoom:[RoomEvent!]
}

input UserInput{
  name:String!
  email:String!
  password:String!
  
}  

type AuthData{
  userID:ID!
  token: String!
  tokenExpiration: Int!
}

input EventInput {
  name:String!
  img:String!
} 

input RoomInput{
  roomName:String
}

 type RootQuery{
      events:[Event!]!
      roomEvents:[RoomEvent!]!
      userEvents:[UserEvent!]!
      login(email:String!, password: String!):AuthData!
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
