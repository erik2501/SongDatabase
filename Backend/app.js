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

// this is where we started the express server
var app = Express();
var cors = require("cors");
const e = require("express");
app.use(cors());

// this is where we connect to the db with mongoose
console.log("Starting...")
mongoose
    .connect("mongodb://it2810-14.idi.ntnu.no:27017/project3")
    .then(() => console.log("Connected to database.."))
    .catch(err => console.error(err));
// these are our two schemas
const songSchema = new mongoose.Schema({
    songID: Number,
    artistName: String,
    songName: String,
    durationMS: Number,
    year: Number,
    energy: Number,
    imageURL: String
}, { collection: "songs" });

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
    description: String,
    songID: {
        type: Number,
        required: true,
        immutable: true,

    },
})
// these are our two models
const SongModel = mongoose.model("song", songSchema);

const ReviewModel = mongoose.model('review', reviewSchema);
// these are our three grapghQL types
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
        userName: { type: GraphQLString },
        star: { type: GraphQLInt },
        description: { type: GraphQLString },
        songID: { type: GraphQLInt }
    }
})

const AvgScoreType = new GraphQLObjectType({
    name: 'avgscore',
    fields: { _id: { type: GraphQLInt }, avgScore: { type: GraphQLFloat } }
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
            songSearchCount: {
                type: GraphQLInt,
                args: {
                    searchWord: { type: GraphQLString },
                    year: { type: GraphQLInt }
                },
                resolve: (root, args, context, info) => {
                    if (args.year === 0) {
                        return SongModel.countDocuments({ $or: [{ 'songName': { $regex: args.searchWord, '$options': 'i' } }, { 'artistName': { $regex: args.searchWord, '$options': 'i' } }] })
                    }
                    else {
                        return SongModel.countDocuments({ $and: [{ $or: [{ 'songName': { $regex: args.searchWord, '$options': 'i' } }, { 'artistName': { $regex: args.searchWord, '$options': 'i' } }] }, { 'year': args.year }] })
                    }
                }
            },
            songSearch: {
                type: GraphQLList(SongType),
                args: {
                    skip: { type: GraphQLInt },
                    amount: { type: GraphQLInt },
                    searchWord: { type: GraphQLString },
                    year: { type: GraphQLInt },
                    order: { type: GraphQLInt }
                },
                resolve: (root, args, context, info) => {
                    if (args.year === 0) {
                        return SongModel.find({ $or: [{ 'songName': { $regex: args.searchWord, '$options': 'i' } }, { 'artistName': { $regex: args.searchWord, '$options': 'i' } }] }).sort({ songID: args.order }).skip(args.skip).limit(args.amount).exec()
                    } else {
                        return SongModel.find({ $and: [{ $or: [{ 'songName': { $regex: args.searchWord, '$options': 'i' } }, { 'artistName': { $regex: args.searchWord, '$options': 'i' } }] }, { 'year': args.year }] }).sort({ songID: args.order }).skip(args.skip).limit(args.amount).exec()
                    }

                }
            },
            reviewAvgScoreBySongID: {
                type: GraphQLList(AvgScoreType),
                args: {
                    songID: { type: GraphQLInt }
                },
                resolve: (root, args, context, info) => {
                    return ReviewModel.aggregate().match({ 'songID': args.songID }).group({ _id: null, avgScore: { $avg: "$star" } })
                }
            },
            reviewsBySongID: {
                type: GraphQLList(ReviewType),
                args: {
                    songID: { type: GraphQLInt },
                    amount: { type: GraphQLInt }
                },
                resolve: (root, args, context, info) => {
                    return ReviewModel.find({ 'songID': args.songID }).sort({ _id: -1 }).limit(args.amount).exec();
                }
            },
            getDistinctYears: {
                type: GraphQLList(GraphQLInt),
                resolve: (root, args, context, info) => {
                    return SongModel.distinct('year').exec()
                }
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'mutation',
        fields: {
            addReview: {
                type: ReviewType,
                args: {
                    userName: { type: GraphQLString },
                    star: { type: GraphQLInt },
                    description: { type: GraphQLString },
                    songID: { type: GraphQLInt }
                },
                resolve: (root, args, context, info) => {
                    let review = new ReviewModel({
                        userName: args.userName,
                        star: args.star,
                        description: args.description,
                        songID: args.songID
                    });
                    return review.save()
                }
            }
        }
    })
})
// this is where we specify the url and run the schema on the express server
app.use("/songs", ExpressGraphQL({
    schema: schema,
    graphiql: true
})
);

app.listen(3001, () => {
    console.log("server running at 3001");
});
