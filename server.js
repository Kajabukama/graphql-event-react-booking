const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const graphqlSchema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/index');

const app = express();
app.use(bodyParser.json());


app.use('/graphql', graphqlHTTP({
	schema: graphqlSchema,
	rootValue: graphqlResolvers,
	graphiql: true
}));


// server logic
// database

const PORT = process.env.PORT || 3000

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@kajabukama-x01vq.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`, { useNewUrlParser: true })
.then(()=>{
	app.listen(PORT, console.log(`Server started on Port ${ PORT }`));
})
.catch((error) => console.log('There was an error : '+error))


