const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));


mongoose
  .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.gafjw.mongodb.net/?retryWrites=true&w=majority`)
  .then(_result => {
    app.listen(4000, () => {
      console.log('Now listening for requests on port 4000');
    });
  })
  .catch(err => {
    console.log(err);
  });
mongoose.connection.once('open', () => console.log('Connected to database!'));