import React from "react";
import FahrtdetailsAnbietenAuswahl from "./FahrtdetailsAnbietenAuswahl.js";
import FahrtdetailsCheckboxengruppeBlau from "./FahrtdetailsCheckboxengruppeBlau.js";
import FahrtdetailsCheckboxengruppeRot from "./FahrtdetailsCheckboxengruppeRot.js";

export default function FahrtdetailsAnbieten(props) {
  const [preis, setPreis] = React.useState(undefined);
  const [sitze, setSitze] = React.useState(undefined);
  const [umwege, setUmwege] = React.useState(true);
  const [maennlicheMitfahrer, setMaennlicheMitfahrer] = React.useState(true);
  const [weiblicheMitfahrer, setWeiblicheMitfahrer] = React.useState(true);
  const [rauchen, setRauchen] = React.useState(true);
  const [tierauto, setTierauto] = React.useState(true);

  const callbackFunctionAuswahl = (childData1, childData2) => {
    setPreis(childData1);
    setSitze(childData2);
    props.parentCallback(
      childData1,
      childData2,
      umwege,
      maennlicheMitfahrer,
      weiblicheMitfahrer,
      rauchen,
      tierauto
    );
  };

  const callbackFunctionBlau = (childData1, childData2, childData3) => {
    setUmwege(childData1);
    setMaennlicheMitfahrer(childData2);
    setWeiblicheMitfahrer(childData3);
    props.parentCallback(
      preis,
      sitze,
      childData1,
      childData2,
      childData3,
      rauchen,
      tierauto
    );
  };

  const callbackFunctionRot = (childData1, childData2) => {
    setRauchen(childData1);
    setTierauto(childData2);
    props.parentCallback(
      preis,
      sitze,
      umwege,
      maennlicheMitfahrer,
      weiblicheMitfahrer,
      childData1,
      childData2
    );
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr"
      }}
    >
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <FahrtdetailsAnbietenAuswahl
          parentCallback={callbackFunctionAuswahl}
          
        ></FahrtdetailsAnbietenAuswahl>
      </div>
      <FahrtdetailsCheckboxengruppeBlau
        parentCallback={callbackFunctionBlau}

      ></FahrtdetailsCheckboxengruppeBlau>
      <FahrtdetailsCheckboxengruppeRot
        parentCallback={callbackFunctionRot}

      ></FahrtdetailsCheckboxengruppeRot>
    </div>
  );
}
