const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Event = require('./models/event');

const listEvents = [];

const app = express();
app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
	schema: buildSchema(`
		type Event {
			_id: ID!
			title: String!
			place: String!
			description: String!
			price: Float!
			date: String!
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
		}
		type RootMutation {
			createEvent(eventInput: EventInput): Event
		}
		schema {
			query: RootQuery
			mutation: RootMutation
		}
	`),
	rootValue: {
		events: () => {
			return listEvents;
		},
		createEvent: (args) => {
			// const newEvent = {
			// 	_id: Math.random().toString(),
			// 	title: args.eventInput.title,
			// 	place: args.eventInput.place,
			// 	description: args.eventInput.description,
			// 	price: +args.eventInput.price,
			// 	date: new Date().toISOString()
			// }
			// listEvents.push(newEvent);
			const event = new Event({
				title: args.eventInput.title,
				place: args.eventInput.place,
				description: args.eventInput.description,
				price: +args.eventInput.price,
				date: new Date().toISOString()
			})
			event.save();
			return event;
		}
	},
	graphiql: true
}));


// server logic
// database

const PORT = process.env.PORT || 3000

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@kajabukama-x01vq.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`, { useNewUrlParser: true })
.then(()=>{
	app.listen(PORT, 'localhost', console.log(`Server started on Port ${ PORT }`));
})
.catch((error) => console.log('There was an error : '+error))


