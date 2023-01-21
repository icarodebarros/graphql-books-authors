const graphql = require('graphql');

const { 
  GraphQLObjectType, 
  GraphQLID, // make the query more flexible so you can pass a number or string as ID
  GraphQLString, 
  GraphQLSchema,
  GraphQLInt
} = graphql;

// Dummy data
const books = [
  { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
  { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
  { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
];
const authors = [
  { name: 'Patrick Rothfuss', age: 44, id: '1' },
  { name: 'Brandon Sanderson', age: 42, id: '2' },
  { name: 'Terry Pratchett', age: 66, id: '3' }
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args){
        console.log(parent); // parent -> Book
        return authors.find(a => a.id === parent.authorId);
      }
    }
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
        return books.find(b => b.id === args.id);
      },
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        // code to get data from db/other source
        return authors.find(a => a.id === args.id);
      }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
