const { buildSchema } = require('graphql')
const BuildSchema = buildSchema(`
   type Event {
      _id: ID!
      title: String!
      place: String!
      description: String!
      price: Float!
      date: String!
      creator: User!
   }

   type User {
      _id: ID!
      firstname: String!
      lastname: String!
      mobile: Int!
      username: String!
      email: String!
      password: String
      role: Int!
      status: Boolean!
      createdEvents: [Event!]
      created_on: String!
   }

   input UserInput {
      firstname: String!
      lastname: String!
      mobile: Int!
      username: String!
      email: String!
      password: String!
      role: Int!
      status: Boolean!
      created_on: String!
   }

   input EventInput {
      title: String!
      place: String!
      description: String!
      price: Float!
      date: String!
   }
   type RootQuery {
      events: [Event!]!
      users: [User!]!
   }
   type RootMutation {
      createEvent(eventInput: EventInput): Event
      createUser(userInput: UserInput): User
   }
   schema {
      query: RootQuery
      mutation: RootMutation
   }
`)

module.exports = BuildSchema;