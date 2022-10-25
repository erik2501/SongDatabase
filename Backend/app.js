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
        userName: { type: GraphQLString },
        star: { type: GraphQLInt },
        description: { type: GraphQLString },
        songID: { type: GraphQLInt }
    }
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
                    searchWord: { type: GraphQLString }
                },
                resolve: (root, args, context, info) => {
                    return SongModel.countDocuments({ $or: [ {'songName': { $regex: args.searchWord, '$options' : 'i' }}, { 'artistName': { $regex: args.searchWord,  '$options' : 'i'} }] })
                }
            },
            songSearch: {
                type: GraphQLList(SongType),
                args: {
                    skip: { type: GraphQLInt },
                    amount: { type: GraphQLInt },
                    searchWord: { type: GraphQLString }
                },
                resolve: (root, args, context, info) => {
                    return SongModel.find({ $or: [{ 'songName': { $regex: args.searchWord, '$options' : 'i'  } }, { 'artistName': { $regex: args.searchWord, '$options' : 'i'  } }] }).sort({ songID: -1 }).skip(args.skip).limit(args.amount).exec()
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

app.use("/songs", ExpressGraphQL({
    schema: schema,
    graphiql: true
})
);

app.listen(3001, () => {
    console.log("server running at 3001");
});

// async function run() {
//     const rev = new ReviewModel({ userName: 'cat', star: 5, reviewDescription: 'bra', song: '6345556c61d7bda047cb5196' })
//     await rev.save()
//     console.log(rev)
// }
// run()