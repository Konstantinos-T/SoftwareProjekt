import axios from 'axios';

export function getDriveDataByUser(params) {

    //this.setState ({ searchNo: this.state.searchNo+1 });
    axios.get("http://localhost:5000/posts/find", { params })
      .then((response) => {
        if (response.data.length > 0) {
          const responseData = response.data;
          this.setState({ response: responseData });
        }
        //Response: driveData
        this.mapAxiosDriveResponse(response);
      });
}
// Um den Fahrer zu übergeben und diese Daten in den Cardgenerator zu bekommen braucht man folgende Zeilen Code:
//      const Details = { Fahrer: this.state.user }  //Zeile 18+19 in einer onClick methode 
//      this.setState ({ Suche: Details });
//
//      <CardGenerator  key={this.state.searchNo} type="SuchenFahrtCard" params={ this.state.Suche }></CardGenerator> //Der Cardgenerator mit dem entsprechenen TYP von Karte
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function createUser(User) {

    //this.setState ({ searchNo: this.state.searchNo+1 });
    axios.post('http://localhost:5000/posts', User)
    .then(res => console.log(res.data));
} 
// Um den Fahrer zu übergeben und diese Daten in den Cardgenerator zu bekommen braucht man folgende Zeilen Code:
//     const User = {
//     Benutzername: this.state.user,
//     Nachname: this.state.Start,
//     Vorname: this.state.StartLongitude,
//     Hochschule: this.state.StartLatitude,
//     Studiengang: this.state.Ziel,
//     Semester: this.state.ZielLongitude,
//     Automarke: this.state.ZielLatitude,
//     Auto_Farbe: this.state.Datum,
//     Kennzeichen: this.state.Abfahrt,
//     Geschlecht: this.state.Ankunft,
//     Wohnort: this.state.Preis, 
//     BenutzerOrt:[{      
//             Ort: String,               
//             Latitude: Number,
//             Longitude: Number
//     }],
//     Profilfoto: String
//     alertMitfahrtWurdeGelöscht: Number,
//     alertWurdeAngenommen: Number,
//     alertWurdeBeiFahrtAbgelehhnt: Number,
//    };
//         
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export function getUserData(params) {

    //this.setState ({ searchNo: this.state.searchNo+1 });
    axios.get("http://localhost:5000/userPosts/find", { params })
      .then((response) => {
        if (response.data.length > 0) {
          const responseData = response.data;
          this.setState({ responseUser: responseData }); //responseUser[] array in der Seite bei der man nach einem User sucht einbinden.
        }
        //Response: userData
        this.mapAxiosDriveResponse(response);
      });
}
// Um den Fahrer zu übergeben und diese Daten in den Cardgenerator zu bekommen braucht man folgende Zeilen Code:
//      const Details = { Benutzer: this.state.user }  //Zeile 18+19 in einer onClick methode 
//      this.setState ({ SucheUser: Details });
//
//      <CardGenerator  key={this.state.searchNo} type="SuchenFahrtCard" params={ this.state.Suche }></CardGenerator> //Der Cardgenerator mit dem entsprechenen TYP von Karte
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export function GetUserAuth(){
    axios.get("http://localhost:8100/auth/isAuth", { withCredentials: true })
    .then((res) => {
    console.log(res);
    let auth = res.data.state;
    let user = res.data.user;
    this.setState({ isLoggedIn: auth });            //Notwendiger State auf jeder Page -> isLoggedIn
    this.setState({ user: user.id });               //Notwendiger State auf jeder Page -> user
    localStorage.setItem("isLoggedIn", auth);
    console.log("isAuth", auth);
    console.log("UserID", user.id);
    });
}
//
// Funktion die auf jeder Seite in componentDidMount eingebunden werden muss
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export function DeletePost(params){
    axios.delete("http://localhost:5000/posts/:id", { params })
}
// Um den Fahrer zu übergeben und diese Daten in den Cardgenerator zu bekommen braucht man folgende Zeilen Code:
//      const FahrtID = { id: this.state._id }  //Zeile 18+19 in einer onClick methode 
//      console.log(FahrtID);
//      this.setState ({ _id: id });
//
//      <Card> params={ _id }></Card> //Der Cardgenerator mit dem entsprechenen TYP von Karte
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


