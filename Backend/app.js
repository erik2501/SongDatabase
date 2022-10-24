const Express = require("express");
const ExpressGraphQL = require("express-graphql").graphqlHTTP;
const mongoose = require("mongoose");
// const { SongModel, ReviewModel } = require('./Schemas')

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

console.log("Starting...")
mongoose
    .connect("mongodb://it2810-14.idi.ntnu.no:27017/project3")
    .then(() => console.log("Connected to database.."))
    .catch(err => console.error(err));

const songSchema = new mongoose.Schema({
    songID: Number,
    artistName: String,
    songName: String,
    durationMS: Number,
    year: Number,
    energy: Number,
    imageURL: String

}, { collection: "Music" });

const reviewSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        immutable: true
    },
    star: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    reviewDescription: String,
    song: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        immutable: true,
        // validate: {
        //     validator: v => v
        // } sjekk at v finnes i songs?
    },
})

const SongModel = mongoose.model("song", songSchema);

const ReviewModel = mongoose.model('review', reviewSchema);

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

const ReviewType = new GraphQLObjectType({
    name: 'review',
    fields: {
        _id: { type: GraphQLID },
        reviewID: { type: GraphQLInt },
        userName: { type: GraphQLString },
        star: { type: GraphQLInt },
        reviewDescription: { type: GraphQLString }
    }
})

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            // alle mulige sanger
            song: {
                type: GraphQLList(SongType),
                resolve: (root, args, context, info) => {
                    return SongModel.find().exec();
                }
            },
            songs_paginated: {
                type: GraphQLList(SongType),
                args: {
                    skip: { type: GraphQLInt }, // Står på nett at dette er CPU expensive og slow. Kan kanskje endre til å ha amount og en filter på '-createdOn'
                    amount: { type: GraphQLInt }
                },
                resolve: (root, args, context, info) => {
                    return SongModel.find().skip(args.skip).limit(args.amount).exec()
                }
            },

            // sanger basert på artistnavn
            // songsByArtistName: {
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
                    skip: { type: GraphQLInt },
                    amount: { type: GraphQLInt },
                    filter: { type: GraphQLString },
                    searchWord: { type: GraphQLString }
                },
                resolve: (root, args, context, info) => {
                    if (args.filter === 'Any') {
                        return SongModel.find({ $or: [{ 'songName': { $regex: args.searchWord } }, { 'artistName': { $regex: args.searchWord } }] }).sort({ songID: -1 }).skip(args.skip).limit(args.amount).exec()
                    }
                    else if (args.filter === 'Song') {
                        return SongModel.find({ 'songName': { $regex: args.searchWord } }).sort({ songID: -1 }).skip(args.skip).limit(args.amount).exec()
                    }
                    else {
                        return SongModel.find({ 'artistName': { $regex: args.searchWord } }).sort({ songID: -1 }).skip(args.skip).limit(args.amount).exec()
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

async function run() {
    const rev = new ReviewModel({ userName: 'cat', star: 5, reviewDescription: 'bra', song: '6345556c61d7bda047cb5196' })
    await rev.save()
    console.log(rev)
}
// run()