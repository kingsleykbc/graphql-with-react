const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
	name: String,
	genre: String,
	authorID: mongoose.Types.ObjectId
});

module.exports = mongoose.model('Book', bookSchema);
