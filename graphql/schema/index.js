const { buildSchema } = require('graphql');

const BuildSchema = buildSchema(`
  type Booking {
		_id: ID!
		event: Event!
		user: User!
		createdAt: String!
		updatedAt: String!
	}
	type Event {
		_id: ID!
		title: String!
		place: String!
		description: String!
		price: Float!
		date: String!
		creator: User!
		createdAt: String!
		updatedAt: String!
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
		createdAt: String!
		updatedAt: String!
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
		bookings: [Booking!]!
	}
	type RootMutation {
		createEvent(eventInput: EventInput): Event
		createUser(userInput: UserInput): User
		bookEvent(eventId: ID!): Booking!
		cancelBooking(bookingId: ID!): Event!
	}
	schema {
		query: RootQuery
		mutation: RootMutation
	}
`)

module.exports = BuildSchema;