import mongoose from 'mongoose'; 

//Jeder Benutzer hat einem einzigartigen Benutzernamen (KEY).

const userSchema = new mongoose.Schema({
    Benutzername: {type: String, require: true, unique:true },
	Nachname: {type: String },
	Vorname: {type: String },
	Hochschule: {type: String },	
	Studiengang: String,
	Semester: Number,
	Automarke: String,
	Auto_Farbe: String,
	Kennzeichen: String,
	Geschlecht: String,
	Wohnort: String,
	BenutzerOrt:[{
		Ort: String,
		Latitude: Number,
		Longitude: Number
	}],
	Profilfoto: String,
	alertMitfahrtWurdeGelöscht: Number,
	alertWurdeAngenommen: Number,
	alertWurdeBeiFahrtAbgelehhnt: Number,
	Like: Number,
	Dislike: Number,
});


var User = mongoose.model('User', userSchema);

export default User;

