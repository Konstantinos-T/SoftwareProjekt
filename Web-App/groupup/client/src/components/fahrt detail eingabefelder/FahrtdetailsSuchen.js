import React from "react";
import FahrtdetailsSuchenAuswahl from "./FahrtdetailsSuchenAuswahl.js";
import FahrtdetailsCheckboxengruppeRot from "./FahrtdetailsCheckboxengruppeRot.js";

export default function FahrtdetailsSuchen(props) {
  const [preis, setPreis] = React.useState(undefined);
  const [rauchen, setRauchen] = React.useState(true);
  const [tierauto, setTierauto] = React.useState(true);

  const callbackFunctionAuswahl = (childData) => {
    setPreis(childData);
    props.parentCallback(childData, rauchen, tierauto);
  };

  const callbackFunctionRot = (childData1, childData2) => {
    setRauchen(childData1);
    setTierauto(childData2);
    props.parentCallback(preis, childData1, childData2);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
      }}
    >
      <div>
        <FahrtdetailsSuchenAuswahl
          parentCallback={callbackFunctionAuswahl}
          incomingValue={props.incomingValue}
        ></FahrtdetailsSuchenAuswahl>
      </div>
      <FahrtdetailsCheckboxengruppeRot
        parentCallback={callbackFunctionRot}
      ></FahrtdetailsCheckboxengruppeRot>
    </div>
  );
}
