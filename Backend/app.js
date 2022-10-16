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
    }
}
*/
//her får vi ikke koblet til project 3, kun inn i generell database
//prøvd på mange ulike måter men ingen gir riktig forbindelse
//SPØR 
mongoose
.connect("mongodb://admin:gruppe14@it2810-14.idi.ntnu.no:27017/project3?authSource=admin")
.then(() => console.log("Connected to database.."))
.catch(err => console.error(err));

const SongModel = mongoose.model("song", {
    songID: Number,
    artistName: String,
    songName: String,
    durationMS: Number,
    year: Number,
    energy: Number
});

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

const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: "Query",
		fields: {
			// alle mulige sanger
            songs : {
                type: GraphQLList(SongType),
                resolve: (root, args, context, info) => {
                    return SongModel.find().exec();
                }
            },
            // sanger basert på artistnavn
            songsByArtistName: {
				type: GraphQLList(SongType),
				args: { 
					artistName: { type: GraphQLString } 
				},
				resolve: (root, args, context, info) => {
					return SongModel.find({'artistName':args.artistName}).exec();
				}
			}
		}
	})
})


app.use("/song", ExpressGraphQL({
        schema : schema,
        graphiql: true
    })
);

app.listen(3001, () => {
    console.log("server running at 3001");
});