const express = require('express');
const { graphqlHTTP, getGraphQLParams } = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');
require('./helpers/initializeMongoDB');

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.listen(8080, () => {
	console.log('App listening on 8080');
});
