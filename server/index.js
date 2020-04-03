const express = require("express");
const bodyParses = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");

const graphQlSchema = require("./graphql/schema/index");
const resolvers = require("./graphql/resolvers/index");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParses.json());

app.use(
  "/graphql",

  graphqlHttp({
    schema: graphQlSchema,

    rootValue: resolvers,

    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-bsaro.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });
