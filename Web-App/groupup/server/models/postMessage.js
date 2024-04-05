import mongoose from 'mongoose'; 


const postSchema = new mongoose.Schema({
	Fahrer: String,
	Start: String,
	Ziel: String,
	Datum: Date,
	Abfahrt: Date,
	Ankunft: Date,
	Preis: Number,
	Sitze: Number,
	Umwege: Boolean,
	MaennlicheMitfahrer: Boolean,
	WeiblicheMitfahrer: Boolean,
	Rauchen: Boolean,
	Tierauto: Boolean,
    createdAt: {
        type: Date,
        default: new Date(),
	},
	StartLongitude: Number,
	StartLatitude: Number,
	EndLongitude: Number,
	EndLatitude: Number,
	BelegteSitze: Number,
	Mitfahrer: [],
	MitfahrAnfragender:[],
	MitfahrerAbgelent:[]
});


var PostMessage = mongoose.model('PostMessage', postSchema);


export default PostMessage;


