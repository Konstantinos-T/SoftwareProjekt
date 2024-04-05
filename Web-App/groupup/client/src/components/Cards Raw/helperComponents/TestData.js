import React, { Component } from "react";


 export default class CardGeneratorFahrtenSuchen extends Component {
  //props: params, type
  state = {
    response: [],
    userData: "",
    testUserData:{
        benutzerObjektID:"testUser01",
        benutzerProfilBild:"https://media.krankenkassenzentrale.de/assets/Icon_Test_V3.png",
        benutzerName: "TestUserMax",
        benutzerSemeser: 4,
        benutzerStudiengang: "TestStudiengang",
        benutzerWohnort: "TestWohnort",
        benutzerHochschule:"TestHochschule",
        benutzerAuto:"TestAuto",
        benutzerGeschlecht:"M",
        benutzerOrt:"TestOrt",
        benutzerLat:"10.2",
        benutzerLong:"10.2",
        alertMitfahrtWurdeGelöscht: 0,
        alertWurdeAngenommen:0,
        alertWurdeBeiFahrtAbgelehnt:0
      },

      testUserData2:{
        benutzerObjektID:"testUser02",
        benutzerProfilBild:"https://media.krankenkassenzentrale.de/assets/Icon_Test_V3.png",
        benutzerName: "TestUserMax",
        benutzerSemeser: 4,
        benutzerStudiengang: "TestStudiengang",
        benutzerWohnort: "TestWohnort",
        benutzerHochschule:"TestHochschule",
        benutzerAuto:"TestAuto",
        benutzerGeschlecht:"M",
        benutzerOrt:"TestOrt",
        benutzerLat:"10.3",
        benutzerLong:"10.3",
        alertMitfahrtWurdeGelöscht: 1,
        alertWurdeAngenommen:1,
        alertWurdeBeiFahrtAbgelehnt:1
      },
          //Testen
          testDriveData:{
      fahrtCreatedAt:"",
      fahrtObjektID:"",
      fahrtFahrerID:"test01",
      fahrtDatum:"",
      fahrtAbfahrtsZeit:"",
      fahrtAbfahrtsOrt:"testFahrtAbfahrtsOrt",
      fahrtAbfahrtsLat:"10.1",
      fahrtAbfahrtLong:"10.1",
      fahrtAbfahrtsZeit:"",
      fahrtAnkunftsOrt:"testFahrtAnkunftsOrt",
      fahrtAnkunftsLat:"10.5",
      fahrtAnkunftsLong:"10.5",
      fahrtAnkunftsZeit:"",
      fahrtAuto:"",
      fahrtKennzeichen:"",
      fahrtPreis:"3",
      fahrtSitze:2,
      fahrtSitzeFrei:1,
      fahrtRauchen:true,
      fahrtTierAuto:false,
      rideRequests:{
        pending: { //TestUSer
          benutzerObjektID:"testUser01",
        benutzerProfilBild:"https://media.krankenkassenzentrale.de/assets/Icon_Test_V3.png",
        benutzerName: "TestUser1",
        benutzerSemeser: 4,
        benutzerStudiengang: "TestStudiengang",
        benutzerWohnort: "TestWohnort",
        benutzerHochschule:"TestHochschule",
        benutzerAuto:"TestAuto",
        benutzerGeschlecht:"M",
        benutzerOrt:"TestOrt",
        benutzerLat:"10.2",
        benutzerLong:"10.2",
        alertMitfahrtWurdeGelöscht: 0,
        alertWurdeAngenommen:0,
        alertWurdeBeiFahrtAbgelehnt:0
        },
        accepted:  [{ benutzerObjektID:"testUser02",
        benutzerProfilBild:"https://media.krankenkassenzentrale.de/assets/Icon_Test_V3.png",
        benutzerName: "TestUser2",
        benutzerSemeser: 4,
        benutzerStudiengang: "TestStudiengang",
        benutzerWohnort: "TestWohnort",
        benutzerHochschule:"TestHochschule",
        benutzerAuto:"TestAuto",
        benutzerGeschlecht:"M",
        benutzerOrt:"TestOrt",
        benutzerLat:"10.2",
        benutzerLong:"10.2",
        alertMitfahrtWurdeGelöscht: 0,
        alertWurdeAngenommen:0,
        alertWurdeBeiFahrtAbgelehnt:0}],
        denied: [{benutzerObjektID:"testUser02",
        benutzerProfilBild:"",
        benutzerName: "TestUserMax",
        benutzerSemeser: 4,
        benutzerStudiengang: "TestStudiengang",
        benutzerWohnort: "TestWohnort",
        benutzerHochschule:"TestHochschule",
        benutzerAuto:"TestAuto",
        benutzerGeschlecht:"M",
        benutzerOrt:"TestOrt",
        benutzerLat:"10.3",
        benutzerLong:"10.3",
        alertMitfahrtWurdeGelöscht: 1,
        alertWurdeAngenommen:1,
        alertWurdeBeiFahrtAbgelehnt:1}]
      }
          }
  

  };
}





