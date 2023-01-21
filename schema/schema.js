const graphql = require('graphql');

const { 
  GraphQLObjectType, 
  GraphQLID, // make the query more flexible so you can pass a number or string as ID
  GraphQLString, 
  GraphQLSchema,
  GraphQLInt
} = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        // code to get data from db/other source
        return {
          id: 'id' + args.id,
          name: 'name' + args.id,
          genre: 'genre' + args.id,
        };
      },
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        // code to get data from db/other source
        return {
          id: 'id' + args.id,
          name: 'name' + args.id,
          age: 40 + +args.id,
        };
      }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
