const Express = require("express");
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
app.use(cors());
/*
    {

          username: "admin",
          password: "gruppe14"
          dbName:#project3"
    }
}
*/
//her får vi ikke koblet til project 3, kun inn i generell database
//prøvd på mange ulike måter men ingen gir riktig forbindelse
console.log("Starting...")
mongoose
    .connect("mongodb://it2810-14.idi.ntnu.no:27017/project3")
    .then(() => console.log("Connected to database.."))
    .catch(err => console.error(err));


const SongModel = mongoose.model("song", mongoose.Schema({
    songID: Number,
    artistName: String,
    songName: String,
    durationMS: Number,
    year: Number,
    energy: Number,
    imageURL: String
}, { collection: "songs" }));

const SongType = new GraphQLObjectType({
    name: "Song",
    fields: {
        _id: { type: GraphQLID },
        songID: { type: GraphQLInt },
        artistName: { type: GraphQLString },
        songName: { type: GraphQLString },
        durationMS: { type: GraphQLInt },
        year: { type: GraphQLInt },
        energy: { type: GraphQLFloat },
        imageURL: { type: GraphQLString }
    },
})

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            songBySongID: {
                type: GraphQLList(SongType),
                args: {
                    songID: { type: GraphQLInt }
                },
                resolve: (root, args, context, info) => {
                    return SongModel.find({ 'songID': args.songID }).exec();
                }
            },
            // songSearchLength: {
            //     type: GraphQLInt,
            //     args: {
            //         filter: { type: GraphQLString },
            //         searchWord: { type: GraphQLString }
            //     },
            //     resolve: (root, args, context, info) => {
            //         return SongModel.find({ 'songName': { $regex: args.searchWord } }).length
            //     }
            // },
            songSearch: {
                type: GraphQLList(SongType),
                args: {
                    skip: {type: GraphQLInt},
                    amount: { type: GraphQLInt},
                    filter: { type: GraphQLString },
                    searchWord: { type: GraphQLString }
                },
                resolve: (root, args, context, info) => {
                    if (args.filter === 'Any') {
                        return SongModel.find({ $or: [ {'songName': { $regex: args.searchWord }}, { 'artistName': { $regex: args.searchWord } }] }).skip(args.skip).limit(args.amount).exec()
                    }
                    else if (args.filter === 'Song'){
                        return SongModel.find({ 'songName': { $regex: args.searchWord } }).skip(args.skip).limit(args.amount).exec()
                    } 
                    else {
                        return SongModel.find({ 'artistName': { $regex: args.searchWord } }).skip(args.skip).limit(args.amount).exec()
                    }
                }
            }
        }
    })
})


app.use("/songs", ExpressGraphQL({
    schema: schema,
    graphiql: true
})
);

app.listen(3001, () => {
    console.log("server running at 3001");
});