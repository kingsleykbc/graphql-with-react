const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://admin:wordpass666@cluster0.8nrcx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose
	.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Mongo DB Connected'))
	.catch(e => console.log('Error connecting to Mongo DB: ', e.message));
