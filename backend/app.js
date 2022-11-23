const Express  = require('express');
const ExpressGraphQL = require('express-graphql').graphqlHTTP;
const schema = require("./schema");
const cors = require('cors')


const app = Express();

const sqlite3 = require('sqlite3').verbose();

//create a database if no exists
const database = new sqlite3.Database("./app.db");

// const PersonModel = mongoose.model('Person', {
//     firstName: String,
//     lastName: String,
//     email: String,
//     age: Number,
//     gender: Boolean,
// });

// const PersonType = new GraphQLObjectType({
//     name: 'Person',
//     fields: {
//         id: { type: GraphQLID },
//         firstName: { type: GraphQLString },
//         lastName: { type: GraphQLString },
//         email: { type: GraphQLString },
//         age: { type: GraphQLInt },
//         gender: { type: GraphQLBoolean },
//     }
// });

// const schema = new GraphQLSchema({
// 	query: new GraphQLObjectType({
// 		name: "Query",
// 		fields: {
// 			// Query 1

// 			// name of the query, people
// 			people: {
// 				 // the type of response this query will return, here PersonType
// 				type: GraphQLList(PersonType),
// 				// resolver is required
// 				resolve: (root, args, context, info) => {
// 					// we are returning all persons available in the table in mongodb
// 					return PersonModel.find().exec();
// 				}
// 			},
// 			// Query 2
// 			peopleByID: {
// 				// name of the query is people by id
// 				type: PersonType,
// 				args: {
// 					// strong validation for graphqlid, which is mendatory for running this query
// 					id: { type: GraphQLNonNull(GraphQLID) }
// 				},
// 				resolve: (root, args, context, info) => {
// 					return PersonModel.findById(args.id).exec();
// 				}
// 			},
// 			// Query 3
// 			peopleByName: {
// 				type: GraphQLList(PersonType),
// 				args: { 
// 					firstName: { type: GraphQLString } 
// 				},
// 				resolve: (root, args, context, info) => {
// 					return PersonModel.find({'firstName':args.firstName}).exec();
// 				}
// 			}
// 		}
// 	}),

// 	// Mutation 1
// 	mutation: new GraphQLObjectType({
// 		name: "Create",
// 		fields: {
// 			people: {
// 				type: PersonType,
// 				args: {
// 					firstName: { type: GraphQLString },
// 					lastName: { type: GraphQLString },
//                     email: { type: GraphQLString },
//                     age: { type: GraphQLInt },
//                     gender: { type: GraphQLBoolean },
// 				},
// 				resolve: (root, args, context, info) => {
// 					var people = new PersonModel(args);
// 					return people.save();
// 				}
// 			}
// 		}
// 	})
// });

app.use(cors())
app.use("/graphql", ExpressGraphQL({schema:schema.schema, graphiql: true}));

app.listen(3001, () => {
	console.log("server running at 3001");
});
