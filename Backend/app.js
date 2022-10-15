const Express = require("express");
const schema = require('mongoose').Schema;
const ExpressGraphQL = require("express-graphql").graphqlHTTP;
const mongoose = require("mongoose");
const {
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList,
    GraphQLType,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLObjectType
} = require("graphql");

var app = Express();
var cors = require("cors");

mongoose
.connect("mongodb://admin:gruppe14@it2810-14.idi.ntnu.no:27017/project3", {
    auth: {
        user: "admin",
        password: "gruppe14"
    }
})
.then(() => console.log("Connected to database.."))
.catch(err => console.error(err));

const SongModel = mongoose.model("song", {
    songID: Number,
    artistName: String,
    songName: String,
    durationMS: Number,
    year: Number,
    energy: Number
})

const SongType = new GraphQLObjectType({
    name: "Song",
    fields: {
        _id: { type: GraphQLID },
        songID: { type: GraphQLInt },
        artistName: { type: GraphQLString },
        songName: { type: GraphQLString },
        durationMS: { type: GraphQLInt },
        year: { type: GraphQLInt },
        energy: { type: GraphQLFloat }
    }
})

app.use("/song", ExpressGraphQL({
        schema,
        graphiql: true
    })
);

app.listen(3001, () => {
    console.log("server running at 3001");
});