const _ = require('lodash');
const graphql = require('graphql');
const Author = require('../models/author');
const Book = require('../models/book');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;

/**
 * TYPES
 */
const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID }, // GraphQLID will allow you use string and number for ID (grqph ql wi)
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve: (parent, args) => Author.findById(parent.authorID)
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve: (parent, args) => Book.find({ authorID: parent.id })
		}
	})
});

/**
 * QUERY
 */
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return Book.find();
			}
		},
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } }, // like book(id:"123"){...}
			resolve(parent, args) {
				// code to get data
				return Book.findById(args.id);
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				return Author.find();
			}
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Author.findById(args.id);
			}
		}
	}
});

/**
 * SETUP MUTATION
 */
const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) }
			},
			resolve: async (parent, { name, age }) => await Author.create({ name, age })
		},
		addBook: {
			type: BookType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				authorID: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve: async (parent, { name, genre, authorID }) => await Book.create({ name, genre, authorID })
		}
	}
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });

// Dummybase
const dummyBooks = [
	{ id: '1', name: 'Harry Potter', genre: 'Magic', authorID: '3' },
	{ id: '2', name: 'Spider-man', genre: 'Action', authorID: '2' },
	{ id: '3', name: 'The stranded passangers', genre: 'Sco-fi', authorID: '1' },
	{ id: '4', name: 'Spider-man 3', genre: 'Action', authorID: '2' },
	{ id: '5', name: 'The king of the hill', genre: 'Fantasy', authorID: '3' }
];

const dummyAuthors = [
	{ id: '1', name: 'Zach king', age: 30 },
	{ id: '2', name: 'James Franco', age: 29 },
	{ id: '3', name: 'Susan Friend', age: 15 }
];
